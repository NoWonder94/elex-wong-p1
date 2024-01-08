import { GGG, MyRank } from '../myrank';


interface IGG {
    ggenv?: string[];
}

interface IFF {
    ffname: string;
    aa?: IGG[];
}

enum EnumTest {
    AA,
    BB,
    CC
}

export interface onRank extends IFF, IGG {
    /**
     * The float of the nowplayers.
     *
     * @additionalProperties number
     * @aTJS-type rray
     */
    normalArr: number[];
    /**
     * @TJS-type number
     */
    enum: EnumTest;
    normalStrArr: string[];
    innerGGG?: GGG;
    ranks: MyRank[];
    rk?: MyRank;
    val?: number;
}