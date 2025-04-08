type Role =
    | "Chí Phèo"
    | "Bá Kiến"
    | "Lý Cường"
    | "Bà Ba"
    | "Lão Hạc"
    | "Thị Nở"
    | "Ông Giáo"
    | "Bà Cô của Thị Nở"
    | "Binh Chức"
    | "Dân thường"
    | "Đội Tảo"
    | "Tự Lãng"
    | "Năm Thọ";

export class Player {
    name: string; // Tên
    role: Role; // Vai trò (Chí Phèo, Bá Kiến...)
    team: string; // Phe (Công lý, ...)
    coins: number; // Xu
    frustration: number; // Điểm công lý
    wine: number; // Điểm rượu
    chosen: number; // Trường hợp Chí Phèo bị chọn 2 lần liền bởi Thị Nở
    items: string[]; // Các thẻ
    shutup: boolean; // Câm
    drunk: boolean; // Say
    alive: boolean; // Sống

    constructor(name: string, role: Role) {
        this.name = name;
        this.role = role;
        this.team = this.assignTeam(role);
        this.coins = 3;
        this.frustration = 0;
        this.wine = 0;
        this.items = [];
        this.shutup = false;
        this.drunk = false;
        this.alive = true;
    }

    private assignTeam(role: Role): string {
        if (["Bá Kiến", "Lý Cường", "Bà Ba"].includes(role)) {
            return "Quyền Thế";
        } else if (
            [
                "Lão Hạc",
                "Thị Nở",
                "Ông Giáo",
                "Bà Cô của Thị Nở",
                "Binh Chức",
                "Dân thường",
            ].includes(role)
        ) {
            return "Công Lý";
        } else if (role === "Đội Tảo") {
            return "Đội Tảo";
        } else {
            return "Lang Thang";
        }
    }

    addCoins(amount: number) {
        this.coins += amount;
    }

    removeCoins(amount: number) {
        this.coins = Math.max(0, this.coins - amount);
    }

    addItem(item: string) {
        this.items.push(item);
    }

    removeItem(item: string) {
        this.items = this.items.splice(this.items.indexOf(item), 1);
    }

    increaseFrustration(amount: number) {
        this.frustration += amount;
    }

    increaseWine(amount: number) {
        this.wine += amount;
    }

    mute() {
        this.shutup = true;
    }

    unmute() {
        this.shutup = false;
    }

    chosenDrunk() {
        this.drunk = true;
    }

    undrunk() {
        this.drunk = false;
    }

    kill() {
        this.alive = false;
    }

    changeTeam(newTeam: string) {
        this.team = newTeam;
    }

    // Debug / info
    getStatus() {
        return {
            name: this.name,
            role: this.role,
            team: this.team,
            coins: this.coins,
            frustration: this.frustration,
            wine: this.wine,
            items: this.items,
            shutup: this.shutup,
            alive: this.alive,
        };
    }
}

