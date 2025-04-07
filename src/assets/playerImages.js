// Nhập tất cả hình ảnh nhân vật
import baKien from './player/Bá Kiến.png';
import lyCuong from './player/Lý Cường.png';
import baBa from './player/Bà Ba.png';
import ongTuDam from './player/Ông Tư Đạm.png';
import thiNo from './player/Thị Nở.png';
import anhHangXom from './player/Anh Hàng Xóm.png';
import baCo from './player/Bà Cô của Thị Nở.png';
import binhChuc from './player/Binh Chức.png';
import danThuong from './player/Dân thường.png';
import doiTao from './player/Đội Tảo.png';
import chiPheo from './player/Chí Phèo.png';
import tuLang from './player/Tự Lãng.png';
import namTho from './player/Năm Thọ.png';

// Tạo object map từ tên vai trò đến đường dẫn hình ảnh
const playerImages = {
  'Bá Kiến': baKien,
  'Lý Cường': lyCuong,
  'Bà Ba': baBa,
  'Ông Tư Đạm': ongTuDam,
  'Thị Nở': thiNo,
  'Anh Hàng Xóm': anhHangXom,
  'Bà Cô của Thị Nở': baCo,
  'Binh Chức': binhChuc,
  'Dân thường': danThuong,
  'Đội Tảo': doiTao,
  'Chí Phèo': chiPheo,
  'Tự Lãng': tuLang,
  'Năm Thọ': namTho
};

// Fall back to a default image if role not found
const getPlayerImage = (role) => {
  return playerImages[role] || danThuong; // Sử dụng ảnh dân thường làm ảnh mặc định
};

export default getPlayerImage;
