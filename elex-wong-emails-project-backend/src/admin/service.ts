
class AdminService {
  private adminProcess = false;

  public isAdminProcess(): boolean {
    return this.adminProcess;
  }

  public setAdminProcess() {
    this.adminProcess = true;
  }
}

export const adminService = new AdminService();