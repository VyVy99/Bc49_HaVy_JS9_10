// @ts-nocheck
var arrIdInput = [
    "id", "tknv", "name", "email", "password", "datepicker", "luongCB", "chucvu", "gioLam",
];
var arrnoItInput = ['tbId', 'tbTKNV', 'tbTen', 'tbEmail', 'tbMatKhau', 'tbNgay', 'tbLuongCB', 'tbChucVu', 'tbGiolam']


var arrNhanVien = [];

function themNhanVien(event) {
    event.preventDefault();
    let isValid = true
    var nhanVien = new NhanVien()

    for (var i = 0; i < arrIdInput.length; i++) {
        var value = document.getElementById(arrIdInput[i]).value;
        nhanVien[arrIdInput[i]] = value;
    }

    nhanVien.tinhLuong();
    nhanVien.xepLoaiNhanVien();

    isValid &= kiemTraDuLieuRong(arrIdInput, arrnoItInput, nhanVien)
    isValid &= kiemTraEmail(nhanVien.email, arrnoItInput)

    if (isValid) {
        arrNhanVien.push(nhanVien);

        luuDuLieuLocal();
        hienThiDanhSachNhanVien(arrNhanVien);
    }
}

document.getElementById('btnThemNV').onclick = themNhanVien;

function hienThiDanhSachNhanVien(data = arrNhanVien) {
    var content = "";
    for (var i = 0; i < data.length; i++) {
        var nhanVien = data[i];

        var newNhanVien = new NhanVien();
        Object.assign(newNhanVien, nhanVien);

        content += `
            <tr>
                <td>${newNhanVien.tknv}</td>
                <td>${newNhanVien.name}</td>
                <td>${newNhanVien.email}</td>
                <td>${newNhanVien.datepicker}</td>
                <td>${newNhanVien.chucvu}</td>
                <td>${newNhanVien.luongCB}</td>
                <td>${newNhanVien.xepLoaiNhanVien()}</td>
                <td class="d-flex">
                    <button class="btn btn-danger mr-2" onclick="xoaNhanVien('${newNhanVien.id}')" >Xoá</button> 
                    <button class="btn btn-primary" data-toggle="modal" data-target="#myModal" onclick="suaNhanVien('${newNhanVien.id}')" >Sửa</button> 
                </td>
            </tr>
        `;
    }
    document.getElementById("tableDanhSach").innerHTML = content;
}

function xoaNhanVien(id) {

    // tạo ra 1 biêsn index
    var index = -1;
    for (var i = 0; i < arrNhanVien.length; i++) {
        if (arrNhanVien[i].tknv == id) {
            index = i;
            // thoát khỏi vòng lặp

        }
    }
    arrNhanVien.splice(index, 1);
    luuDuLieuLocal();
    hienThiDanhSachNhanVien(arrNhanVien);
}

function luuDuLieuLocal() {
    // chueyenr mảng dữ liệu json.stringtify trc khi lưu
    var newArr = JSON.stringify(arrNhanVien);
    localStorage.setItem("arrNhanVien", newArr);

}
function layDuLieuLocal() {
    var arr = localStorage.getItem("arrNhanVien");
    // chuyển đổi về kiẻu dữ liệu ban đầu:

    if (arr != null) {

        var newArr = JSON.parse(arr);
        arrNhanVien = newArr;
        hienThiDanhSachNhanVien(arrNhanVien);
    }

}
layDuLieuLocal();

function suaNhanVien(id) {
    var nhanVien = {}
    //tìm thông tin nhana vieen co id trong mảng arrNhanVien
    //nếu có thì gọi mảng arrIdinput để cập nhật gái trị mới từ nhanVien tìm đc
    // Tìm thông tin nhân viên có id trong mảng arrNhanVien
    for (var i = 0; i < arrNhanVien.length; i++) {
        if (arrNhanVien[i].id == id) {
            nhanVien = arrNhanVien[i];
            break;
        }
    }
    // Nếu tìm thấy nhân viên, gán giá trị mới từ form vào thuộc tính của nhân viên
    if (nhanVien.id) {
        for (var z = 0; z < arrIdInput.length; z++) {
            const domInput = document.getElementById(arrIdInput[z])
            if (arrIdInput[z] === 'id') {
                domInput.readOnly = true
            }
            domInput.value = nhanVien[arrIdInput[z]]

        }

        // Tính toán lại tổng lương và xếp loại của nhân viên
        nhanVien.tongLuong = nhanVien.tinhLuong();
        nhanVien.xepLoai = nhanVien.xepLoaiNhanVien();
        // Cập nhật lại mảng arrNhanVien và lưu vào localStorage
        luuDuLieuLocal();
        hienThiDanhSachNhanVien(arrNhanVien);
    } else {
        alert("Khong tim thay id ", id)
    }
}

function capNhatNhanVien() {
    // dom thong tin nhan vien cu
    // neu cos nhan vien , ta thay doi du lieu , sau do luu dl xuong local , reset lai form, render giao dien
    var nhanVien = new NhanVien()
    for (let index = 0; index < arrIdInput.length; index++) {
        nhanVien[arrIdInput[index]] = document.getElementById(arrIdInput[index]).value
    }

    for (var i = 0; i < arrNhanVien.length; i++) {
        if (arrNhanVien[i].id === nhanVien.id) {
            arrNhanVien[i] = nhanVien
            break;
        }
    }
    luuDuLieuLocal()
    hienThiDanhSachNhanVien()

}
window.capNhatNhanVien = capNhatNhanVien


function search(e) {
    const keywords = e.target.value // e.target.value la du lieu cua input
    // xepLoai = "xuất sắc";
    // xepLoai = "giỏi";
    // xepLoai = "khá";
    // xepLoai = "trung bình";
    const newArrNhanVien = []
    for (let index = 0; index < arrNhanVien.length; index++) {
        const nhanvien = new NhanVien()
        Object.assign(nhanvien, arrNhanVien[index])
        if (removeVietnameseTones(nhanvien.xepLoaiNhanVien()).indexOf(removeVietnameseTones(keywords)) > -1) {
            newArrNhanVien.push(nhanvien)
        }


    }
    hienThiDanhSachNhanVien(newArrNhanVien)
}


document.getElementById('btnDong').onclick = function () {
    document.getElementById("formNhanVien")?.reset()
    for (let index = 0; index < arrnoItInput.length; index++) {
        document.getElementById(arrnoItInput[index]).innerHTML = ""

    }
}