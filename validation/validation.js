function kiemTraDuLieuRong(arrIdInput, arrNoItInput, nhanVien) {
    // sẽ gọi ra các thẻ input và show lỗi cho ng dùng nếu ko lỗi ko heienr thị gì cả
    console.log(arrIdInput);
    var valid = true;
    for (var z = 0; z < arrIdInput.length; z++) {
        // check xem có dữ liệu trong thuộc tính hay ko,
        if (nhanVien[arrIdInput[z]] == "") {
            console.log(document.getElementById(arrNoItInput[z]));
            valid = valid && false;
            document.getElementById(arrNoItInput[z]).innerHTML ="Vui lòng nhập dữ liệu";
        } else {
            document.getElementById(arrNoItInput[z]).innerHTML = "";
            valid = valid && true;
        }
    }
    return valid;

}

function kiemTraEmail(valueEmail, arrnoItInput) {
    var regexEmail =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var valid =true
    if (valueEmail !== "") {
        if (!regexEmail.test(valueEmail)) {
            document.getElementById(arrnoItInput).innerHTML =
                "định dạng email ko đúng";
            valid = valid && false;
        } else {
            // đàu tiên gán gia giá vào cho biến valid
            document.getElementById(arrnoItInput).innerHTML = "";
            valid = valid && true;
        }
        return valid
    }

}

