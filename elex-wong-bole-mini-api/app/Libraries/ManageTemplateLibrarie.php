<?php 
namespace App\Libraries;

use Lang, Tpl;

/**
 * 后台模板类
 * Class ManageTemplateLibrarie
 * @package App\Libraries
 */
class ManageTemplateLibrarie extends TemplateLibrarie {
    protected $dir = 'manage';

    /**LIST格式化BEGIN**/
    /**
     * 预格式化列表相关标签
     * @param  [type] $content [description]
     * @return [type]          [description]
     */
    protected function preList($content, &$pattrs) {
        return $this->preTags($content, [
                        '<search', '</search>', 
                        '<content', '</content>', 
                        '<tabs', '</tabs>'
                    ], [
                        '<tpl:listSearch', '</tpl:listSearch>', 
                        '<tpl:listContent', '</tpl:listContent>', 
                        '<tpl:tabs', '</tpl:tabs>'
                    ]);
    }

    /**
     * 格式化列表标签
     * @param  array  $attrs   属性
     * @param  string $content 内容
     * @return string          格式化后的内容
     */
    protected function parseList($attrs, $content, &$pattrs) {
        return $this->formatTpl('list.list', ['attrs' => $attrs, 'content' => $content]);
    }

    /**
     * 预格式化列表搜索标签
     * @param  [type] $content [description]
     * @return [type]          [description]
     */
    protected function preListSearch($content, &$pattrs) {
        return $this->preTags($content, [
                        '<row', '</row>', 
                        '<item', '</item>', 
                        '<btn', '</btn>', 
                        '<linkbtn', '</linkbtn>' 
                    ], [
                        '<tpl:listSearchRow', '</tpl:listSearchRow>', 
                        '<tpl:fitem search="1"', '</tpl:fitem>',
                        '<tpl:btn', '</tpl:btn>', 
                        '<tpl:linkBtn', '</tpl:linkBtn>'
                    ]);
    }

    /**
     * 格式化列表搜索标签
     * @param  [type] $content [description]
     * @return [type]          [description]
     */
    protected function parseListSearch($attrs, $content, &$pattrs) {
        return $this->formatTpl('list.search', ['attrs' => $attrs, 'content' => $content]);
    }

    /**
     * 格式化列表搜索行标签
     * @param  [type] $content [description]
     * @return [type]          [description]
     */
    protected function parseListSearchRow($attrs, $content, &$pattrs) {
        return $this->formatTpl('list.search-row', ['attrs' => $attrs, 'content' => $content]);
    }

    /**
     * 预格式化列表内容
     * @param  [type] $content [description]
     * @return [type]          [description]
     */
    protected function preListContent($content, &$pattrs) {
        return $this->preTags($content, [
                        '<btns', '</btns>', 
                        '<table', '</table>'
                    ], [
                        '<tpl:listBtns', '</tpl:listBtns>', 
                        '<tpl:listTable', '</tpl:listTable>'
                    ]);
    }

    /**
     * 格式化列表内容
     * @param  [type] $content [description]
     * @return [type]          [description]
     */
    protected function parseListContent($attrs, $content, &$pattrs) {
        return $this->formatTpl('list.content', ['attrs' => $attrs, 'content' => $content]);
    }

    /**
     * 预格式化列表按钮集合标签
     * @param  [type] $content [description]
     * @return [type]          [description]
     */
    protected function preListBtns($content) {
        return $this->preTags($content, [
                        '<btn', '</btn>', 
                        '<linkbtn', '</linkbtn>'
                    ], [
                        '<tpl:btn', '</tpl:btn>', 
                        '<tpl:linkBtn', '</tpl:linkBtn>'
                    ]);
    }

    /**
     * 格式化列表搜索行标签
     * @param  [type] $content [description]
     * @return [type]          [description]
     */
    protected function parseListBtns($attrs, $content, &$pattrs) {
        return $this->formatTpl('list.btns', ['attrs' => $attrs, 'content' => $content]);
    }

    /**
     * 预格式化列表表格标签
     * @param  [type] $content [description]
     * @return [type]          [description]
     */
    protected function preListTable($content, &$pattrs) {
        return $this->preTags($content, [
                        '<columns', '</columns>', 
                        '<rows', '</rows>', 
                        '<foot', '</foot>', 
                        '<body', '</body>'
                    ], [
                        '<tpl:listColumns', '</tpl:listColumns>', 
                        '<tpl:listRows', '</tpl:listRows>', 
                        '<tpl:listFoot', '</tpl:listFoot>', 
                        '<tpl:listBody', '</tpl:listBody>'
                    ]);
    }

    /**
     * 格式化列表表格标签
     * @param  array  $attrs   属性
     * @param  string $content 内容
     * @return string          格式化后的内容
     */
    protected function parseListTable($attrs, $content, &$pattrs) {
        return $this->formatTpl('list.table', ['attrs' => $attrs, 'content' => $content, 'List' => $pattrs['List']]);
    }

    /**
     * 格式化列表底部
     * @param  [type] $attrs   [description]
     * @param  string $content [description]
     * @return [type]          [description]
     */
    protected function parseListFoot($attrs, $content, &$pattrs) {
        return $this->formatTpl('list.tfoot', ['attrs' => $attrs, 'content' => $content]);
    }

    protected function preListBody($content, &$pattrs) {
        return $this->prePregTags($content, [
                                            '/<actions.*?>/', '/<\/actions>/', 
                                            '/<action/', '/<\/action>/'
                                        ], [
                                            '', '', 
                                            '<tpl:listAction', '</tpl:listAction>'
                                        ]);
    }

    /**
     * 格式化列表内容
     * @param  [type] $attrs   [description]
     * @param  string $content [description]
     * @return [type]          [description]
     */
    protected function parseListBody($attrs, $content, &$pattrs) {
        return $this->formatTpl('list.body', ['attrs' => $attrs, 'content' => $content, 'List' => $pattrs['List']]);
    }

    /**
     * 格式化列表头部数据列
     * @param  [type] $attrs   [description]
     * @param  string $content [description]
     * @return [type]          [description]
     */
    protected function parseListHeader($attrs, $content, &$pattrs) {
        return $this->formatTpl('list.thead-item', ['attrs' => $attrs, 'content' => $content]);
    }

    /**
     * 格式化列表头部操作列
     * @param  [type] $attrs   [description]
     * @param  string $content [description]
     * @return [type]          [description]
     */
    protected function parseListHeaderActions($attrs, $content, &$pattrs) {
        $attrs['label'] = Lang::get('root::tpl.handler');
        return $this->formatTpl('list.thead-item', ['attrs' => $attrs, 'content' => $content]);
    }

    /**
     * 预格式化自定义行
     * @param  [type] $content [description]
     * @return [type]          [description]
     */
    protected function preListRows($content, &$pattrs) {
        preg_match("/<headers.*?>(?<headers>.*?)<\/headers>.*?<row.*?>(?<row>.+?)<\/row>/is", $content, $rows);
        preg_match("/<actions.*?>(.+?)<\/actions>/is", $rows['row'], $actions);
        if ($actions) {
            $rows['headers'] .= $this->preTags($actions[0], [
                                                '<actions', '</actions>'
                                            ], [
                                                '<tpl:listHeaderActions', '</tpl:listHeaderActions>'
                                            ]);
        }

        $html = $this->formatTpl('list.thead', $pattrs, ['content' => $this->preTags($rows['headers'], [
                                    '<header', '</header>'
                                ], [
                                    '<tpl:listHeader', '</tpl:listHeader>'
                                ])]);

        if ($actions) {
            $content = $this->prePregTags($rows['row'], [
                                            '/<actions.*?>/', '/<\/actions>/', 
                                            '/<action/', '/<\/action>/'
                                        ], [
                                            '', '', 
                                            '<tpl:listAction', '</tpl:listAction>'
                                        ]);
        } else {
            $content = $rows['row'];
        }
        $html .= $this->formatTpl('list.tbody-rows', $pattrs, ['content' => $content]);
        return $html;
    }

    /**
     * 预格式化列表列
     * @param  [type] $content [description]
     * @return [type]          [description]
     */
    protected function preListColumns($content, &$pattrs) {
        $html = $this->formatTpl('list.thead', $pattrs, ['content' => $this->preTags($content, [
                                    '<column', '</column>', 
                                    '<actions', '</actions>'
                                ], [
                                    '<tpl:listHeader', '</tpl:listHeader>', 
                                    '<tpl:listHeaderActions', '</tpl:listHeaderActions>'
                                ])]);
        

        $html .= $this->formatTpl('list.tbody', $pattrs, ['content' => $this->preTags($content, [
                                    '<column', '</column>', 
                                    '<actions', '</actions>'
                                ], [
                                    '<tpl:listColumn', '</tpl:listColumn>', 
                                    '<tpl:listActions', '</tpl:listActions>'
                                ])]);
        return $html;
    }

    /**
     * 格式化列表的列标签
     * @param  array  $attrs   属性
     * @param  string $content 内容
     * @return string          格式化后的内容
     */
    protected function parseListColumn($attrs, $content, &$pattrs) {
        $this->formatName('code', $attrs);
        $attrs['style'] = !isset($attrs['align']) ? $attrs['style'] : 'text-align:'.$attrs['align'].';' . $attrs['style'];

        if (empty($content)) {
            if (!empty($attrs['type'])) {
                $content = '{!! Tpl::'.$attrs['type'].'('.$attrs['val'].', "'.$attrs['code'].'", '.$attrs['datasource'].', '.var_export($attrs,true).') !!}';
            }else{
                $content = Tpl::output($attrs['val']);
            }
        }

        return $this->formatTpl('list.tbody-item', ['attrs' => $attrs, 'content' => $content]);
    }

    /**
     * 预格式化列表操作列
     * @param  [type] $content [description]
     * @return [type]          [description]
     */
    protected function preListActions($content, &$pattrs) {
        return $this->preTags($content, ['<action', '</action>'], ['<tpl:listAction', '</tpl:listAction>']);
    }

    /**
     * 格式化列表操作例集合
     * @param  [type] $attrs   [description]
     * @param  string $content [description]
     * @return [type]          [description]
     */
    protected function parseListActions($attrs, $content, &$pattrs) {
        $attrs['css'] = 'list-item-action'.$attrs['css'];
        return $this->parseListColumn($attrs, $content, $pattrs);
    }

    /**
     * 格式化列表操作列
     * @param  [type] $attrs   [description]
     * @param  string $content [description]
     * @return [type]          [description]
     */
    protected function parseListAction($attrs, $content, &$pattrs) {
        if (!empty($content)) {
            return $content;
        }
        return $this->formatTpl('list.tbody-action', ['attrs' => $attrs]);
    }
    /**LIST格式化END**/

    /**Tab格式化BEGIN**/
    protected function preTabs($content, &$pattrs) {
        return $this->preTags($content, [
                    '<navs', '</navs>', 
                    '<panes', '</panes>', 
                ], [
                    '<tpl:tabNavs', '</tpl:tabNavs>', 
                    '<tpl:tabPanes', '</tpl:tabPanes>',
                ]);
    }

    protected function parseTabs($attrs, $content, &$pattrs) {
        return $this->formatTpl('tabs.tabs', ['attrs' => $attrs, 'content' => $content]);
    }

    protected function preTabNavs($content, &$pattrs) {
        return $this->preTags($content, ['<nav', '</nav>'], ['<tpl:tabNav', '</tpl:tabNav>']);
    }

    protected function parseTabNavs($attrs, $content, &$pattrs) {
        return $this->formatTpl('tabs.navs', ['attrs' => $attrs, 'content' => $content]);
    }

    protected function parseTabNav($attrs, $content, &$pattrs) {
        return $this->formatTpl('tabs.nav', ['attrs' => $attrs, 'content' => $content]);
    }

    protected function preTabPanes($content, &$pattrs) {
        return $this->preTags($content, ['<pane', '</pane>'], ['<tpl:tabPane', '</tpl:tabPane>']);
    }

    protected function parseTabPanes($attrs, $content, &$pattrs) {
        return $this->formatTpl('tabs.panes', ['attrs' => $attrs, 'content' => $content]);
    }

    protected function parseTabPane($attrs, $content, &$pattrs) {
        return $this->formatTpl('tabs.pane', ['attrs' => $attrs, 'content' => $content]);
    }
    /**Tab格式化END**/

    protected function parseLinkBtn($attrs, $content, &$pattrs) {
        return $this->parseBtn($attrs, $content, $pattrs, true);
    }

    protected function parseBtn($attrs, $content, &$pattrs, $isLink = false) {
        if (!empty($content)) {
            return $content;
        }
        return $this->formatTpl('common.btn', ['attrs' => $attrs, 'content' => $content, 'isLink' => $isLink]);
    }

    /**
     * 格式化表单
     * @param  [type] $attrs   [description]
     * @param  string $content [description]
     * @return [type]          [description]
     */
    protected function parseForm($attrs, $content, &$pattrs) {
        return $this->formatTpl('form.form', ['attrs' => $attrs, 'content' => $content]);
    }

    /**
     * 格式化表单项
     * @param  [type] $attrs   [description]
     * @param  string $content [description]
     * @return [type]          [description]
     */
    protected function parseFitem($attrs, $content, &$pattrs) {
        if (empty($attrs['datasource'])) {
            $attrs['datasource'] = isset($attrs['search']) ? $pattrs['ListSearch']['datasource'] : $pattrs['Form']['datasource'];
        }
        $this->formatName('name', $attrs);
        return $this->formatTpl('form.item', ['attrs' => $attrs, 'content' => $content]);
    }

    /**
     * 格式化Select标签
     * @param  [type] $attrs   [description]
     * @param  string $content [description]
     * @return [type]          [description]
     */
    protected function parseSelect($attrs, $content, &$pattrs) {
        if (empty($attrs['datasource'])) {
            $attrs['datasource'] = isset($attrs['search']) ? $pattrs['ListSearch']['datasource'] : $pattrs['Form']['datasource'];
        }
        $this->formatName('name', $attrs);
        return $this->formatTpl('common.select', ['attrs' => $attrs, 'content' => $content]);
    }

    /**
     * 格式化Select标签
     * @param  [type] $attrs   [description]
     * @param  string $content [description]
     * @return [type]          [description]
     */
    protected function parseDaterange($attrs, $content, &$pattrs) {
        return $this->formatTpl('common.daterange', ['attrs' => $attrs, 'content' => $content]);
    }

    /**
     * 格式化CheckBox标签
     * @param  [type] $attrs   [description]
     * @param  string $content [description]
     * @return [type]          [description]
     */
    protected function parseCheckbox($attrs, $content, &$pattrs) {
        return $this->formatTpl('common.checkbox', ['attrs' => $attrs, 'content' => $content]);
    }

    /**
     * 格式化Radio标签
     * @param  [type] $attrs   [description]
     * @param  string $content [description]
     * @return [type]          [description]
     */
    protected function parseRadio($attrs, $content, &$pattrs) {
        return $this->formatTpl('common.radio', ['attrs' => $attrs, 'content' => $content]);
    }

    /**
     * 格式化Editor标签
     * @param  [type] $attrs   [description]
     * @param  string $content [description]
     * @return [type]          [description]
     */
    protected function parseEditor($attrs, $content, &$pattrs) {
        if (empty($attrs['datasource'])) {
            $attrs['datasource'] = $pattrs['Form']['datasource'];
        }
        $this->formatName('name', $attrs);

        return $this->formatTpl('common.editor', ['attrs' => $attrs, 'content' => $content]);
    }

    protected function parseImage($attrs, $content, &$pattrs) {
        return $this->formatTpl('common.image', ['attrs' => $attrs, 'content' => $content]);
    }

    protected function parseImageList($attrs, $content, &$pattrs) {
        static $imageListIndex = 0;
        $imageListIndex++;
        $attrs['index'] = $imageListIndex;
        return $this->formatTpl('common.images', ['attrs' => $attrs, 'content' => $content]);
    }

    protected function parseRegion($attrs, $content, &$pattrs) {
        static $regionIndex = 0;
        $regionIndex++;
        $attrs['index'] = $regionIndex;
        return $this->formatTpl('common.region', ['attrs' => $attrs, 'content' => $content]);
    }

    protected function parsePreview($attrs, $content, &$pattrs) {
        preg_match("/<html.*?>(?<html>.*?)<\/html>.*?<form.*?>(?<form>.+?)<\/form>.*?<tpl.*?>(?<tpl>.+?)<\/tpl>/is", $content, $temp);
        $attrs['html'] = $temp['html'];
        $attrs['form'] = $temp['form'];
        $attrs['tpl']  = $temp['tpl'];
        return $this->formatTpl('common.preview', ['attrs' => $attrs, 'content' => $content]);
    }
}

