export class MathHelper {
    /**
     * 求两点距离
     * @param x1 
     * @param y1 
     * @param x2 
     * @param y2 
     */
    static distance(x1: number, y1: number, x2: number, y2: number) {
        let dx: number = x1 - x2;
        let dy: number = y1 - y2;
        let distance: number = Math.sqrt(dx * dx + dy * dy);
        return distance;
    }

    /**
     * 根据角度获得弧度
     * @param radian 
     */
    static getAngleByRadian(radian: number) {
        return radian * 57.3
    }

    static getRadinByAngle(angle: number) {
        return angle / 57.3;
    }

    /**
     * 获得弧度
     * @param x1 
     * @param y1 
     * @param x2 
     * @param y2 
     */
    static getRadianByXY(x1: number, y1: number, x2: number, y2: number) {
        let disx = Math.abs(x2 - x1);
        let disy = Math.abs(y2 - y1);
        let dis = Math.sqrt(disx * disx + disy * disy)
        let radian: number = Math.asin(disx / dis)
        return radian;
    }

    /**
     * 获得角度
     * @param x1 
     * @param y1 
     * @param x2 
     * @param y2 
     */
    static getAngleByXY(x1: number, y1: number, x2: number, y2: number) {
        return this.getRadianByXY(x1, y1, x2, y2) * Math.PI;
    }
}