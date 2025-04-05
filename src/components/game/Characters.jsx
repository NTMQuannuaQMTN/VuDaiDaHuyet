import { useEffect, useState } from 'react'
import "../../styles/home.css"
import "../../styles/form.css"

import background from "../../assets/image.png";

function Character(props) {
    // State to track civilian count
    const [civilianCount, setCivilianCount] = useState(1);
    // State to track which roles are enabled
    const [enabledRoles, setEnabledRoles] = useState({
        // Phe Quyền Thế
        "Bá Kiến": true,
        "Lý Cường": true,
        "Bà Ba": true,
        // Phe Công Lý
        "Ông Tư Đạm": true,
        "Thị Nở": true,
        "Anh Hàng Xóm": true,
        "Bà Cô của Thị Nở": true,
        "Binh Chức": true,
        // Phe Đội Tảo
        "Đội Tảo": true,
        // Những kẻ Lang Thang
        "Chí Phèo": true,
        "Tự Lãng": true,
        "Năm Thọ": true
    });

    // Function to toggle role usage
    const toggleRole = (role) => {
        setEnabledRoles({
            ...enabledRoles,
            [role]: !enabledRoles[role]
        });
    };

    // Function to add a civilian
    const addCivilian = () => {
        setCivilianCount(civilianCount + 1);
    };

    // Function to remove a civilian
    const removeCivilian = () => {
        if (civilianCount > 1) {
            setCivilianCount(civilianCount - 1);
        }
    };

    useEffect(() => {
        setTimeout(() => {
            let title = document.getElementById("title");
            let game_title = document.getElementById("game_title");
            let form = document.getElementById("form_container");
            let buttons = document.getElementsByClassName("button");
            title.style.marginTop = '-50%';
            title.style.opacity = 0;
            setTimeout(() => {
                title.style.display = 'none';
                game_title.style.opacity = 1;
                form.style.height = "60vh";
            }, 1000);
            for (let i = 0; i < buttons.length; ++i) {
                buttons[i].style.width = 'fit-content';
            }
        }, 1000);
    }, []);

    return (<div className='game'>
        <div className='background'>
            <img src={background}></img>
        </div>
        <div id='title'>
            <h2>ĐÊM ĐẦU TIÊN</h2>
        </div>
        <div id='game_title'>
            <h2>Nhập tên người chơi</h2>
        </div>
        <div id='form_container'>
            <div id='form'>
                {/* Phe Quyền Thế */}
                <h2>Phe Quyền Thế</h2>

                {enabledRoles["Bá Kiến"] && (
                    <div className="container">
                        <label htmlFor="ba-kien">Bá Kiến:</label>
                        <input type="text" id="ba-kien" placeholder="Nhập tên người chơi" />
                        <div className="button-container">
                            <button className="role-toggle" onClick={() => toggleRole("Bá Kiến")}>Không sử dụng</button>
                        </div>
                    </div>
                )}

                {!enabledRoles["Bá Kiến"] && (
                    <div className="container disabled">
                        <label>Bá Kiến:</label>
                        <div className="disabled-message">Vai trò này đã bị vô hiệu hóa</div>
                        <div className="button-container">
                            <button className="role-toggle" onClick={() => toggleRole("Bá Kiến")}>Sử dụng</button>
                        </div>
                    </div>
                )}

                {enabledRoles["Lý Cường"] && (
                    <div className="container">
                        <label htmlFor="ly-cuong">Lý Cường:</label>
                        <input type="text" id="ly-cuong" placeholder="Nhập tên người chơi" />
                        <div className="button-container">
                            <button className="role-toggle" onClick={() => toggleRole("Lý Cường")}>Không sử dụng</button>
                        </div>
                    </div>
                )}

                {!enabledRoles["Lý Cường"] && (
                    <div className="container disabled">
                        <label>Lý Cường:</label>
                        <div className="disabled-message">Vai trò này đã bị vô hiệu hóa</div>
                        <div className="button-container">
                            <button className="role-toggle" onClick={() => toggleRole("Lý Cường")}>Sử dụng</button>
                        </div>
                    </div>
                )}

                {enabledRoles["Bà Ba"] && (
                    <div className="container">
                        <label htmlFor="ba-ba">Bà Ba:</label>
                        <input type="text" id="ba-ba" placeholder="Nhập tên người chơi" />
                        <div className="button-container">
                            <button className="role-toggle" onClick={() => toggleRole("Bà Ba")}>Không sử dụng</button>
                        </div>
                    </div>
                )}

                {!enabledRoles["Bà Ba"] && (
                    <div className="container disabled">
                        <label>Bà Ba:</label>
                        <div className="disabled-message">Vai trò này đã bị vô hiệu hóa</div>
                        <div className="button-container">
                            <button className="role-toggle" onClick={() => toggleRole("Bà Ba")}>Sử dụng</button>
                        </div>
                    </div>
                )}

                {/* Phe Công Lý */}
                <h2>Phe Công Lý</h2>

                {enabledRoles["Ông Tư Đạm"] && (
                    <div className="container">
                        <label htmlFor="ong-tu-dam">Ông Tư Đạm:</label>
                        <input type="text" id="ong-tu-dam" placeholder="Nhập tên người chơi" />
                        <div className="button-container">
                            <button className="role-toggle" onClick={() => toggleRole("Ông Tư Đạm")}>Không sử dụng</button>
                        </div>
                    </div>
                )}

                {!enabledRoles["Ông Tư Đạm"] && (
                    <div className="container disabled">
                        <label>Ông Tư Đạm:</label>
                        <div className="disabled-message">Vai trò này đã bị vô hiệu hóa</div>
                        <div className="button-container">
                            <button className="role-toggle" onClick={() => toggleRole("Ông Tư Đạm")}>Sử dụng</button>
                        </div>
                    </div>
                )}

                {enabledRoles["Thị Nở"] && (
                    <div className="container">
                        <label htmlFor="thi-no">Thị Nở:</label>
                        <input type="text" id="thi-no" placeholder="Nhập tên người chơi" />
                        <div className="button-container">
                            <button className="role-toggle" onClick={() => toggleRole("Thị Nở")}>Không sử dụng</button>
                        </div>
                    </div>
                )}

                {!enabledRoles["Thị Nở"] && (
                    <div className="container disabled">
                        <label>Thị Nở:</label>
                        <div className="disabled-message">Vai trò này đã bị vô hiệu hóa</div>
                        <div className="button-container">
                            <button className="role-toggle" onClick={() => toggleRole("Thị Nở")}>Sử dụng</button>
                        </div>
                    </div>
                )}

                {enabledRoles["Anh Hàng Xóm"] && (
                    <div className="container">
                        <label htmlFor="anh-hang-xom">Anh Hàng Xóm:</label>
                        <input type="text" id="anh-hang-xom" placeholder="Nhập tên người chơi" />
                        <div className="button-container">
                            <button className="role-toggle" onClick={() => toggleRole("Anh Hàng Xóm")}>Không sử dụng</button>
                        </div>
                    </div>
                )}

                {!enabledRoles["Anh Hàng Xóm"] && (
                    <div className="container disabled">
                        <label>Anh Hàng Xóm:</label>
                        <div className="disabled-message">Vai trò này đã bị vô hiệu hóa</div>
                        <div className="button-container">
                            <button className="role-toggle" onClick={() => toggleRole("Anh Hàng Xóm")}>Sử dụng</button>
                        </div>
                    </div>
                )}

                {enabledRoles["Bà Cô của Thị Nở"] && (
                    <div className="container">
                        <label htmlFor="ba-co">Bà Cô của Thị Nở:</label>
                        <input type="text" id="ba-co" placeholder="Nhập tên người chơi" />
                        <div className="button-container">
                            <button className="role-toggle" onClick={() => toggleRole("Bà Cô của Thị Nở")}>Không sử dụng</button>
                        </div>
                    </div>
                )}

                {!enabledRoles["Bà Cô của Thị Nở"] && (
                    <div className="container disabled">
                        <label>Bà Cô của Thị Nở:</label>
                        <div className="disabled-message">Vai trò này đã bị vô hiệu hóa</div>
                        <div className="button-container">
                            <button className="role-toggle" onClick={() => toggleRole("Bà Cô của Thị Nở")}>Sử dụng</button>
                        </div>
                    </div>
                )}

                {enabledRoles["Binh Chức"] && (
                    <div className="container">
                        <label htmlFor="binh-chuc">Binh Chức:</label>
                        <input type="text" id="binh-chuc" placeholder="Nhập tên người chơi" />
                        <div className="button-container">
                            <button className="role-toggle" onClick={() => toggleRole("Binh Chức")}>Không sử dụng</button>
                        </div>
                    </div>
                )}

                {!enabledRoles["Binh Chức"] && (
                    <div className="container disabled">
                        <label>Binh Chức:</label>
                        <div className="disabled-message">Vai trò này đã bị vô hiệu hóa</div>
                        <div className="button-container">
                            <button className="role-toggle" onClick={() => toggleRole("Binh Chức")}>Sử dụng</button>
                        </div>
                    </div>
                )}

                {/* Dân thường (có thể thêm nhiều) */}
                <h2>Dân thường</h2>
                <div className="civilians-section">
                    {Array.from({ length: civilianCount }).map((_, index) => (
                        <div className="container" key={`civilian-${index}`}>
                            <label htmlFor={`civilian-${index}`}>Dân thường {index + 1}:</label>
                            <input type="text" id={`civilian-${index}`} placeholder="Nhập tên người chơi" />
                        </div>
                    ))}
                    
                    <div className="civilian-controls">
                        <button className="civilian-btn add" onClick={addCivilian}>+</button>
                        <button className="civilian-btn remove" onClick={removeCivilian} disabled={civilianCount <= 1}>-</button>
                    </div>
                </div>

                {/* Phe Đội Tảo */}
                <h2>Phe Đội Tảo</h2>

                {enabledRoles["Đội Tảo"] && (
                    <div className="container">
                        <label htmlFor="doi-tao">Đội Tảo:</label>
                        <input type="text" id="doi-tao" placeholder="Nhập tên người chơi" />
                        <div className="button-container">
                            <button className="role-toggle" onClick={() => toggleRole("Đội Tảo")}>Không sử dụng</button>
                        </div>
                    </div>
                )}

                {!enabledRoles["Đội Tảo"] && (
                    <div className="container disabled">
                        <label>Đội Tảo:</label>
                        <div className="disabled-message">Vai trò này đã bị vô hiệu hóa</div>
                        <div className="button-container">
                            <button className="role-toggle" onClick={() => toggleRole("Đội Tảo")}>Sử dụng</button>
                        </div>
                    </div>
                )}

                {/* Những kẻ Lang Thang */}
                <h2>Những kẻ Lang Thang</h2>

                {enabledRoles["Chí Phèo"] && (
                    <div className="container">
                        <label htmlFor="chi-pheo">Chí Phèo:</label>
                        <input type="text" id="chi-pheo" placeholder="Nhập tên người chơi" />
                        <div className="button-container">
                            <button className="role-toggle" onClick={() => toggleRole("Chí Phèo")}>Không sử dụng</button>
                        </div>
                    </div>
                )}

                {!enabledRoles["Chí Phèo"] && (
                    <div className="container disabled">
                        <label>Chí Phèo:</label>
                        <div className="disabled-message">Vai trò này đã bị vô hiệu hóa</div>
                        <div className="button-container">
                            <button className="role-toggle" onClick={() => toggleRole("Chí Phèo")}>Sử dụng</button>
                        </div>
                    </div>
                )}

                {enabledRoles["Tự Lãng"] && (
                    <div className="container">
                        <label htmlFor="tu-lang">Tự Lãng:</label>
                        <input type="text" id="tu-lang" placeholder="Nhập tên người chơi" />
                        <div className="button-container">
                            <button className="role-toggle" onClick={() => toggleRole("Tự Lãng")}>Không sử dụng</button>
                        </div>
                    </div>
                )}

                {!enabledRoles["Tự Lãng"] && (
                    <div className="container disabled">
                        <label>Tự Lãng:</label>
                        <div className="disabled-message">Vai trò này đã bị vô hiệu hóa</div>
                        <div className="button-container">
                            <button className="role-toggle" onClick={() => toggleRole("Tự Lãng")}>Sử dụng</button>
                        </div>
                    </div>
                )}

                {enabledRoles["Năm Thọ"] && (
                    <div className="container">
                        <label htmlFor="nam-tho">Năm Thọ:</label>
                        <input type="text" id="nam-tho" placeholder="Nhập tên người chơi" />
                        <div className="button-container">
                            <button className="role-toggle" onClick={() => toggleRole("Năm Thọ")}>Không sử dụng</button>
                        </div>
                    </div>
                )}

                {!enabledRoles["Năm Thọ"] && (
                    <div className="container disabled">
                        <label>Năm Thọ:</label>
                        <div className="disabled-message">Vai trò này đã bị vô hiệu hóa</div>
                        <div className="button-container">
                            <button className="role-toggle" onClick={() => toggleRole("Năm Thọ")}>Sử dụng</button>
                        </div>
                    </div>
                )}

                <div className="form-buttons">
                    <button className="submit-button">Tiếp tục</button>
                </div>
            </div>
        </div>
    </div>);
}

export default Character;
