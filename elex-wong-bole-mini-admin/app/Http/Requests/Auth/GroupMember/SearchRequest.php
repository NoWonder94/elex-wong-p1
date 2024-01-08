<?php
namespace App\Http\Requests\Auth\GroupMember;

use App\Http\Requests\Request;

class SearchRequest extends Request
{

    /**
     * 应用于请求的验证规则。
     *
     * @return array
     */
    public function rules()
    {
        return [
            'page' => 'nullable|integer|between:1,1000000',
            'page_size' => 'nullable|integer|between:1,100',
            'keyword' => 'nullable|string|max:60'
        ];
    }
}
