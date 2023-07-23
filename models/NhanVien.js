
function NhanVien() {
    this.id=0;//id ko dc trùng
    this.tknv = "";
    this.name = "";
    this.email = "";
    this.password = "";
    this.datepicker = "";
    this.luongCB = 0;
    this.chucvu = "";
    this.gioLam = "";
    

    this.tinhLuong = function () {
        var tongLuong = 0;
        if (this.chucvu == "Giám đốc") {
            tongLuong = this.luongCB * 3;
        } else if (this.chucvu === 'Trưởng phòng') {
            tongLuong = this.luongCB * 2;
        } else if (this.chucvu == "Nhân viên") {
            tongLuong = this.luongCB;
        }
        return tongLuong;
    }

    this.xepLoaiNhanVien = function () {
        var xepLoai = "";
        if (this.gioLam >= 192) {
            xepLoai = "xuất sắc";
        } else if (this.gioLam >= 176) {
            xepLoai = "giỏi";
        } else if (this.gioLam >= 160) {
            xepLoai = "khá";
        } else if (this.gioLam < 160) {
            xepLoai = "trung bình";
        }
        return xepLoai;
    }
}

