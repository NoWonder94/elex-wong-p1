<?php 
namespace App\Libraries;

use Illuminate\View\Engines\EngineResolver;
use Illuminate\View\Engines\PhpEngine;
use Illuminate\View\Engines\CompilerEngine;
use Illuminate\View\Compilers\BladeCompiler;
use Illuminate\View\FileViewFinder;
use Illuminate\View\Factory;
use Blade, Lang, Config, Tpl, Helper;

class TemplateLibrarie {
    protected static $tplView = null;
    protected static $defaultDataSource = [
                                        'List' => '$list',
                                        'ListColumn' => '$list_item',
                                        'ListSearch' => '$_search_args',
                                        'Form' => '$data',
                                    ];
    static $sections = [];
    protected $_tagAttrs = [];
    protected $_viewPath;
    protected $dir;

    public function init($viewPath) {
        $this->_viewPath = $viewPath;
        Blade::extend(function($view, $compiler) { 
            $content = preg_replace_callback("/@tpl_include\(('|\")(.+?)\\1(?:,(.+?))?\)/is", array($this, 'formatInclude'), $view);
            $content = preg_replace_callback("/@tpl_section\(('|\")(.+?)\\1\)\r?\n(.*?)@tpl_stop/is", array($this, 'formatSection'), $content);
            $content = preg_replace_callback("/@tpl_yield\(('|\")(.+?)\\1\)\r?\n(.*?)@tpl_stop/is", array($this, 'formatYield'), $content);
            $content = preg_replace_callback("/@tpl_begin(.*)@tpl_end/is", array($this, 'formatTag'), $content);
            $content = str_replace(['<php>', '</php>'], ['<?php', '?>'], $content);
            return $content;
        });
    }

    public function formatTpl($view, $data = [], $mergeData = []) {
        if (self::$tplView == null) {
            $resolver = new EngineResolver;
            $resolver->register('php', function () {
                return new PhpEngine;
            });

            $app = app();
            $resolver->register('blade', function () use ($app) {
                $cache = APP_SITE_PATH . 'storage/framework/views/component/' . Lang::getLocale();

                if (!file_exists($cache)) {
                    mkdir($cache, 0777, true);
                }

                return new CompilerEngine(new BladeCompiler($app['files'], $cache));
            });

            $finder = new FileViewFinder($app['files'], [APP_SITE_PATH . 'resources/component']);

            self::$tplView = new Factory($resolver, $finder, $app['events']);
            self::$tplView->setContainer($app);
        }
        $content = self::$tplView->make($this->dir . '.' . $view, $data, $mergeData)->render();
        $content = str_replace('{@}', '@', $content);
        return $content;
    }

    public function formatInclude($match){
        $path = explode('.', $match[2]);
        $file = array_pop($path).'.blade.php';
        $path = $this->_viewPath . '/' . implode('/', $path) . '/' . $file;
        $content = '';
        if (!empty($match[3])) {
            $content .= '<php>
                    $_TPL_INCLUDE_ARGS = '.trim($match[3]).';
                    extract($_TPL_INCLUDE_ARGS, EXTR_PREFIX_ALL, "_tpl");
                </php>';
        }
        $content .= file_get_contents($path);
        $content = preg_replace_callback("/@tpl_include\(('|\")(.+?)\\1(?:,(.+?))?\)/is", array($this, 'formatInclude'), $content);
        return $content;
    }

    public function formatSection($match){
        self::$sections[$match[2]] = trim($match[3]);
        return '';
    }

    public function formatYield($match){
        return isset(self::$sections[$match[2]]) ? self::$sections[$match[2]] : trim($match[3]);
    }

    /**
     * 格式化自定义标签
     * @param  [type] $match [description]
     * @return [type]        [description]
     */
    protected function formatTag($match) {
        $callback = function($matches){ 
            $pattrs = [];
            return $this->parseTag($matches, $pattrs);
        };
        return preg_replace_callback("/<tpl:(.*?)(\s(?<attrs>.*?))?>(?<content>.*?)<\/tpl:\\1>/is", $callback, $match[1]);
    }

    /**
     * 格式化自定义标签回调函数
     * @param  [type] $match [description]
     * @return [type]        [description]
     */
    protected function parseTag($match, &$pattrs) {
        $content    = trim($match['content']);
        $tag        = ucfirst($match[1]);
        $parse_tag  = 'parse' . $tag;
        $pre_tag    = 'pre' . $tag;

        if (method_exists($this, $parse_tag) || method_exists($this, $pre_tag)) {
            $attrs   = $this->parseAttrs($tag, trim($match['attrs']), $content);

            /*格式化通用属性*/
            $attrs['attr']  = !isset($attrs['attr']) ?  '' : ' '.$attrs['attr'];
            $attrs['css']   = !isset($attrs['css']) ?  '' : ' '.$attrs['css'];
            $attrs['style'] = !isset($attrs['style']) ? '' : $attrs['style'];
            $pattrs[$tag] = $attrs;

            if (method_exists($this, $pre_tag)) {
                $content = $this->$pre_tag($content, $pattrs);
            }

            if (!empty($content) && preg_match("/<tpl:(.*?)(?:\s.*?)?>.*?<\/tpl:\\1>/is", $content) > 0) {
                $callback = function($matches) use (&$pattrs) {
                    return $this->parseTag($matches, $pattrs);
                }; 
                $content = preg_replace_callback("/<tpl:(.*?)(\s(?<attrs>.*?))?>(?<content>.*?)<\/tpl:\\1>/is", $callback, $content);
            }

            if (method_exists($this, $parse_tag)) {
                $content = $this->$parse_tag($attrs, $content, $pattrs);
            }
        }
        return $content;
    }

    /**
     * 格式化标签属性
     * @param  string $attrs 属性字符串
     * @return array         属性数组
     */
    protected function parseAttrs($tag, $attrsStr, &$content) {
        $attrs = [];
        //检测是否有xml格式属性
        if (!empty($content) && preg_match("/^\\s*<attrs>.*?<\/attrs>/is", $content, $xml) > 0) {
            $content = preg_replace("/^\\s*<attrs>.*?<\/attrs>/is", '', $content);
            $xml    = @simplexml_load_string($xml[0], 'SimpleXMLElement', LIBXML_NOCDATA);
            if ($xml && $xml->count() > 0) {
                foreach ($xml->children() as $xml_attr) {
                    $val = trim(strval($xml_attr));
                    if ($val === '') {
                        continue;
                    }
                    $attrs[$xml_attr->getName()] = $val;
                }
            }
        }

        if (!empty($attrsStr)) {
            $xml    = '<tpl><tag '.$attrsStr.' /></tpl>';
            $xml    = @simplexml_load_string($xml);
            if ($xml) {
                $xml    = (array)($xml->tag->attributes());
                $xml    = array_diff_key($xml['@attributes'], $attrs);
                foreach($xml as $key => $val){
                    $val = trim(strval($val));
                    if ($val === '') {
                        continue;
                    }
                    $attrs[$key] = $val;
                }
            }
        }

        $datasource = isset($attrs['datasource']) ? trim($attrs['datasource']) : $this->getDefaultDataSource($tag);
        unset($attrs['datasource']);
        foreach($attrs as $key => $val){
            $attrs[$key] = $this->formatVar($val, $datasource);
        }
        if(!empty($datasource)) {
            $attrs['datasource'] = $datasource;
        }
        return $attrs;
    }

    /**
     * 获取标签属性
     * @param  [type] $tag [description]
     * @return [type]      [description]
     */
    protected function getTagAttrs($tag) {
        return $this->_tagAttrs[$tag];
    }

    /**
     * 预约格式化标签
     * @param  [type] $content  [description]
     * @param  [type] $searchs  [description]
     * @param  [type] $replaces [description]
     * @return [type]           [description]
     */
    protected function preTags($content, $searchs, $replaces) {
        return str_replace($searchs, $replaces, $content);
    }
    protected function prePregTags($content, $searchs, $replaces) {
        return preg_replace($searchs, $replaces, $content);
    }

    protected function getDefaultDataSource($tag) {
        if (isset(self::$defaultDataSource[$tag])) {
            return self::$defaultDataSource[$tag];
        }
        return false;
    }

    protected function formatVar($var, $datasource = '') {
        /**
         * $  自带源变量
         * #$ 常量
         * &$ 当前源变量
         * %$ 语言
         */
        $var = trim($var);
        if (strpos($var, '$') === 0) {
            return $var;
        }

        if (strpos($var, '#$') === 0) {
            return constant(substr($var, 2));
        }

        if (strpos($var, '%$') === 0) {
            return Lang::get(substr($var, 2));
        }

        if (strpos($var, '@$') === 0 && !empty($datasource)) {
            $var = explode('[', substr($var, 2), 2);
            return $datasource.'[\''.$var[0].'\']'.(isset($var[1]) ? '[' . $var[1] : '');
        }
        return $var;
    }

    protected function formatName($name, &$attrs) {
        if (!isset($attrs[$name])) {
            return;
        }
        $name = str_replace('[]', '', $attrs[$name]);
        if (strpos($name, '$') === false) {
            if (!isset($attrs['val']) && isset($attrs['datasource'])) {
                $names = explode('[', $name, 2);
                $names = $attrs['datasource'].'['.$names[0].']'.(isset($names[1]) ? '['.$names[1] : '');
                $attrs['val'] = str_replace(['[', ']', '""'], ['["', '"]', ''], $names);
            }
        }

        if (!isset($attrs['id'])) {
            if (strpos($name, '$') === false) {
                $attrs['id'] = str_replace(['[', ']'], ['-', ''], $name);
            } else {
                $attrs['id'] = $name;
            }
        }
    }
}