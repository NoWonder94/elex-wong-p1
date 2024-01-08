export class ProtocolHelper {
    public static getPushCmds(routes: any) {
        let netCmds: string[] = [];
        this.parseWsPushRoutes(netCmds, routes);
        return netCmds;
    }

    private static parseWsPushRoutes(netCmds: string[], routes: any) {
        for (let key in routes) {
            if (typeof routes[key] == "object") {
                this.parseWsPushRoutes(netCmds, routes[key]);
            } else {
                let value = routes[key];
                if (value.indexOf("s_") != -1) {
                    netCmds.push(value);
                }
            }
        }
    }
}
