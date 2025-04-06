import React, { useEffect, useState } from 'react'
import "../../styles/home.css"
import "../../styles/form.css"

import { Player } from "../../types/roles";

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

    let gamePlayers = [];

    const roleID = ['ba-kien', 'ly-cuong', 'ba-ba', 'ong-tu-dam', 'thi-no', 'anh-hang-xom', 'ba-co', 'binh-chuc', 'doi-tao', 'chi-pheo', 'tu-lang', 'nam-tho'];
    const roleIDVN = ['Bá Kiến', 'Lý Cường', 'Bà Ba', 'Ông Tư Đạn', 'Thị Nở', 'Anh Hàng Xóm', 'Bà Cô', 'Binh Chức', 'Đội Tảo', 'Chí Phèo', 'Tự Lãng', 'Năm Thọ'];

    const checkCharacters = () => {
        gamePlayers = [];
        for (let i = 0; i < roleID.length + civilianCount; ++i) {
            if (i < civilianCount) {
                let inp = document.getElementById(`civilian-${i}`);
                if (inp.value == "") {
                    return "Missing name";
                }
                gamePlayers.push(new Player(inp.value, "Dân thường"));
            } else {
                let inp = document.getElementById(roleID[i - civilianCount]);
                if (enabledRoles[roleIDVN[i - civilianCount]] && inp.value == "") {
                    return "Missing name";
                }
                if (enabledRoles[roleIDVN[i - civilianCount]]) {
                    if (inp.value == "") {
                        return "Missing name";
                    }
                    gamePlayers.push(new Player(inp.value, roleIDVN[i - civilianCount]));
                }
            }
        }
        return ((enabledRoles["Bá Kiến"] || enabledRoles["Lý Cường"] || enabledRoles["Bà Ba"]) && (enabledRoles["Ông Tư Đạm"] || enabledRoles["Thị Nở"] || enabledRoles["Anh Hàng Xóm"] || enabledRoles["Bà Cô của Thị Nở"] || enabledRoles["Binh Chức"] || civilianCount > 0) ? "Valid" : "Missing member");
    };

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
        if (civilianCount > 0) {
            setCivilianCount(civilianCount - 1);
        }
    };

    setTimeout(() => {
        console.log("document.body.innerHTML", document.body.innerHTML);
        let game = document.getElementsByClassName("game");
        console.log(game);
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
    }, 2000);

    return (<div className='game'>
        <div className='background'>
            <img src={background}></img>
        </div>
        <div id='title'>
            <h2>ĐÊM 0</h2>
        </div>
        <div id='game_title'>
            <h2>Nhập tên người chơi</h2>
        </div>
        <div id='form_container'>
            <div id='form'>
                {/* Phe Quyền Thế */}
                <h2>Phe Quyền Thế</h2>

                <div className={`container ${!enabledRoles["Bá Kiến"] && 'disabled'}`}>
                    <label htmlFor="ba-kien">Bá Kiến:</label>
                    {enabledRoles["Bá Kiến"] && <input type="text" id="ba-kien" placeholder="Nhập tên người chơi" />}
                    {!enabledRoles["Bá Kiến"] && <div className="disabled-message">Vai trò này đã bị vô hiệu hóa</div>}
                    <div className="button-container">
                        <button className="role-toggle" onClick={() => toggleRole("Bá Kiến")}>{enabledRoles["Bá Kiến"] ? 'Không sử dụng' : 'Sử dụng'}</button>
                    </div>
                </div>

                <div className={`container ${!enabledRoles["Lý Cường"] && 'disabled'}`}>
                    <label htmlFor="ly-cuong">Lý Cường:</label>
                    {enabledRoles["Lý Cường"] && <input type="text" id="ly-cuong" placeholder="Nhập tên người chơi" />}
                    {!enabledRoles["Lý Cường"] && <div className="disabled-message">Vai trò này đã bị vô hiệu hóa</div>}
                    <div className="button-container">
                        <button className="role-toggle" onClick={() => toggleRole("Lý Cường")}>{enabledRoles["Lý Cường"] ? 'Không sử dụng' : 'Sử dụng'}</button>
                    </div>
                </div>

                <div className={`container ${!enabledRoles["Bà Ba"] && 'disabled'}`}>
                    <label htmlFor="ba-ba">Bà Ba:</label>
                    {enabledRoles["Bà Ba"] && <input type="text" id="ba-ba" placeholder="Nhập tên người chơi" />}
                    {!enabledRoles["Bà Ba"] && <div className="disabled-message">Vai trò này đã bị vô hiệu hóa</div>}
                    <div className="button-container">
                        <button className="role-toggle" onClick={() => toggleRole("Bà Ba")}>{enabledRoles["Bà Ba"] ? 'Không sử dụng' : 'Sử dụng'}</button>
                    </div>
                </div>

                {/* Phe Công Lý */}
                <h2>Phe Công Lý</h2>

                <div className={`container ${!enabledRoles["Ông Tư Đạm"] && 'disabled'}`}>
                    <label htmlFor="ong-tu-dam">Ông Tư Đạm:</label>
                    {enabledRoles["Ông Tư Đạm"] && <input type="text" id="ong-tu-dam" placeholder="Nhập tên người chơi" />}
                    {!enabledRoles["Ông Tư Đạm"] && <div className="disabled-message">Vai trò này đã bị vô hiệu hóa</div>}
                    <div className="button-container">
                        <button className="role-toggle" onClick={() => toggleRole("Ông Tư Đạm")}>{enabledRoles["Ông Tư Đạm"] ? 'Không sử dụng' : 'Sử dụng'}</button>
                    </div>
                </div>

                <div className={`container ${!enabledRoles["Thị Nở"] && 'disabled'}`}>
                    <label htmlFor="thi-no">Thị Nở:</label>
                    {enabledRoles["Thị Nở"] && <input type="text" id="thi-no" placeholder="Nhập tên người chơi" />}
                    {!enabledRoles["Thị Nở"] && <div className="disabled-message">Vai trò này đã bị vô hiệu hóa</div>}
                    <div className="button-container">
                        <button className="role-toggle" onClick={() => toggleRole("Thị Nở")}>{enabledRoles["Thị Nở"] ? 'Không sử dụng' : 'Sử dụng'}</button>
                    </div>
                </div>

                <div className={`container ${!enabledRoles["Anh Hàng Xóm"] && 'disabled'}`}>
                    <label htmlFor="anh-hang-xom">Anh Hàng Xóm:</label>
                    {enabledRoles["Anh Hàng Xóm"] && <input type="text" id="anh-hang-xom" placeholder="Nhập tên người chơi" />}
                    {!enabledRoles["Anh Hàng Xóm"] && <div className="disabled-message">Vai trò này đã bị vô hiệu hóa</div>}
                    <div className="button-container">
                        <button className="role-toggle" onClick={() => toggleRole("Anh Hàng Xóm")}>{enabledRoles["Anh Hàng Xóm"] ? 'Không sử dụng' : 'Sử dụng'}</button>
                    </div>
                </div>

                <div className={`container ${!enabledRoles["Bà Cô của Thị Nở"] && 'disabled'}`}>
                    <label htmlFor="ba-co">Bà Cô của Thị Nở:</label>
                    {enabledRoles["Bà Cô của Thị Nở"] && <input type="text" id="ba-co" placeholder="Nhập tên người chơi" />}
                    {!enabledRoles["Bà Cô của Thị Nở"] && <div className="disabled-message">Vai trò này đã bị vô hiệu hóa</div>}
                    <div className="button-container">
                        <button className="role-toggle" onClick={() => toggleRole("Bà Cô của Thị Nở")}>{enabledRoles["Bà Cô của Thị Nở"] ? 'Không sử dụng' : 'Sử dụng'}</button>
                    </div>
                </div>

                <div className={`container ${!enabledRoles["Binh Chức"] && 'disabled'}`}>
                    <label htmlFor="binh-chuc">Binh Chức:</label>
                    {enabledRoles["Binh Chức"] && <input type="text" id="binh-chuc" placeholder="Nhập tên người chơi" />}
                    {!enabledRoles["Binh Chức"] && <div className="disabled-message">Vai trò này đã bị vô hiệu hóa</div>}
                    <div className="button-container">
                        <button className="role-toggle" onClick={() => toggleRole("Binh Chức")}>{enabledRoles["Binh Chức"] ? 'Không sử dụng' : 'Sử dụng'}</button>
                    </div>
                </div>

                {/* Dân thường (có thể thêm nhiều) */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                }}>
                    <h2>Dân thường</h2>
                    <div className="civilian-controls">
                        <button className="civilian-btn add" onClick={addCivilian}>+</button>
                        <button className="civilian-btn remove" onClick={removeCivilian} disabled={civilianCount < 1}>-</button>
                    </div>
                </div>
                <div className="civilians-section">
                    {civilianCount > 0 && Array.from({ length: civilianCount }).map((_, index) => (
                        <div className="container" key={`civilian-${index}`}>
                            <label htmlFor={`civilian-${index}`}>Dân thường {index + 1}:</label>
                            <input type="text" id={`civilian-${index}`} placeholder="Nhập tên người chơi" />
                        </div>
                    ))}
                    {civilianCount == 0 &&
                        <div className="container disabled">
                            <label htmlFor={`civilian`}>Dân thường:</label>
                            <div className="disabled-message">Vai trò này đã bị vô hiệu hóa</div>
                        </div>
                    }
                </div>

                {/* Phe Đội Tảo */}
                <h2>Phe Đội Tảo</h2>

                <div className={`container ${!enabledRoles["Đội Tảo"] && 'disabled'}`}>
                    <label htmlFor="doi-tao">Đội Tảo:</label>
                    {enabledRoles["Đội Tảo"] && <input type="text" id="doi-tao" placeholder="Nhập tên người chơi" />}
                    {!enabledRoles["Đội Tảo"] && <div className="disabled-message">Vai trò này đã bị vô hiệu hóa</div>}
                    <div className="button-container">
                        <button className="role-toggle" onClick={() => toggleRole("Đội Tảo")}>{enabledRoles["Đội Tảo"] ? 'Không sử dụng' : 'Sử dụng'}</button>
                    </div>
                </div>

                {/* Những kẻ Lang Thang */}
                <h2>Những kẻ Lang Thang</h2>

                <div className={`container ${!enabledRoles["Chí Phèo"] && 'disabled'}`}>
                    <label htmlFor="chi-pheo">Chí Phèo:</label>
                    {enabledRoles["Chí Phèo"] && <input type="text" id="chi-pheo" placeholder="Nhập tên người chơi" />}
                    {!enabledRoles["Chí Phèo"] && <div className="disabled-message">Vai trò này đã bị vô hiệu hóa</div>}
                    <div className="button-container">
                        <button className="role-toggle" onClick={() => toggleRole("Chí Phèo")}>{enabledRoles["Chí Phèo"] ? 'Không sử dụng' : 'Sử dụng'}</button>
                    </div>
                </div>

                <div className={`container ${!enabledRoles["Tự Lãng"] && 'disabled'}`}>
                    <label htmlFor="tu-lang">Tự Lãng:</label>
                    {enabledRoles["Tự Lãng"] && <input type="text" id="tu-lang" placeholder="Nhập tên người chơi" />}
                    {!enabledRoles["Tự Lãng"] && <div className="disabled-message">Vai trò này đã bị vô hiệu hóa</div>}
                    <div className="button-container">
                        <button className="role-toggle" onClick={() => toggleRole("Tự Lãng")}>{enabledRoles["Tự Lãng"] ? 'Không sử dụng' : 'Sử dụng'}</button>
                    </div>
                </div>

                <div className={`container ${!enabledRoles["Năm Thọ"] && 'disabled'}`}>
                    <label htmlFor="nam-tho">Năm Thọ:</label>
                    {enabledRoles["Năm Thọ"] && <input type="text" id="nam-tho" placeholder="Nhập tên người chơi" />}
                    {!enabledRoles["Năm Thọ"] && <div className="disabled-message">Vai trò này đã bị vô hiệu hóa</div>}
                    <div className="button-container">
                        <button className="role-toggle" onClick={() => toggleRole("Năm Thọ")}>{enabledRoles["Năm Thọ"] ? 'Không sử dụng' : 'Sử dụng'}</button>
                    </div>
                </div>

                <div className="form-buttons">
                    <button className="submit-button" onClick={() => {
                        let res = checkCharacters();
                        if (res == "Missing name") {
                            alert("Vui lòng Hương Sư điền đầy đủ tên những người chơi");
                        } else if (res == "Missing member") {
                            alert("Vui lòng Hương Sư chơi ít nhất một người phe Quyền Quý và một người phe Công Lý");
                        } else {
                            props.setPlayers(gamePlayers);
                        }
                    }}>Tiếp tục</button>
                </div>
            </div>
        </div>
    </div>);
}

export default Character;
