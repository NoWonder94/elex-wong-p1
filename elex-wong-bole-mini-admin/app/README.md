# app 目录
应用的核心代码位于 app 目录下

## Api 层级划分
- 路由层（路由划分）routes 目录
- 中间件层（权限认证、CSRF 保护）app\Http\Middleware 目录
- 表单验证层（参数的验证和过滤）app\Http\Requests 目录
- 控制器层（主逻辑的控制和调度）app\Http\Controllers 目录
- 业务逻辑层（处理主要业务逻辑）app\Services 目录
- 数据映射层（Post数据映射和格式化）app\Mappers 目录
- 模型层（数据库交互）app\Models 目录
- 数据转化层（格式化数据）app\Http\Resources 目录
- 数据反馈层（Response数据）app\Core\Response 目录

## Api 异常处理

### 系统异常
- Handler拦截层（拦截系统异常）app\Exceptions\Handler 类
- 系统信息转化层（格式化系统信息）app\Core\Entity\Message 目录
- 数据反馈层（Response数据）app\Core\Response 目录

### 自定义异常
- Exception拦截层（拦截自定义异常）app\Exceptions 目录
- 自定义信息转化层（格式化自定义信息）app\Core\Entity\Message 目录
- 数据反馈层（Response数据）app\Core\Response 目录

#### 异常分类
- 系统异常 app\Exceptions\Response\System 目录
- 中间件异常 app\Exceptions\Response\Middleware 目录
- 数据验证异常 app\Exceptions\Response\Request 目录
- 业务逻辑异常 app\Exceptions\Response\Service 目录
- 模型异常 app\Exceptions\Response\Model 目录