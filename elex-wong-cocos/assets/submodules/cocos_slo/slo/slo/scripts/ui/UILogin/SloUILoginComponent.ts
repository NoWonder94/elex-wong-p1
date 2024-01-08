import { Label, Node } from 'cc';
import { SceneNodeComponent } from '../../../../../../cocos.framework/module/scene/SceneNodeComponent';
import { CocosDecorators } from '../../../../../../cocos.framework/CocosDecorators';

@CocosDecorators.ClassNameRegister('SloUILoginComponent')
export class SloUILoginComponent extends SceneNodeComponent {
    public LoginGuest: Node;
    public ClientVersion: Label;
    public ServerVersion: Label;
}