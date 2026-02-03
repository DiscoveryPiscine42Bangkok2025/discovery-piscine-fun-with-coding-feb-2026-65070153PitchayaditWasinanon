const ftList = document.getElementById("ft_list");
const newBtn = document.getElementById("new-btn");

function saveTodos() { // บันทึก To-do List
    const todos = []; // List ของ todos
    ftList.querySelectorAll("div").forEach(d => {
        todos.push(d.textContent);
    }); //push ข้อมูลใหม่เข้าไปใน List เดิมที่มีอยู่
    document.cookie = "todos=" + encodeURIComponent(JSON.stringify(todos)); // เก็บเข้าไปใน cookies
}

function loadTodos() { // load TODO ที่เก็บไว้
    const match = document.cookie.match(/todos=([^;]+)/); // หา todo ใน cookies
    if (!match) return; // ถ้าไม่มีจะออกจาก function นี้ทันที

    const todos = JSON.parse(decodeURIComponent(match[1])); // แปลงข้อมูลจาก cookie เป็น JSON
    todos.reverse().forEach(text => createTodo(text)); // นำ List TODO ที่ได้จาก cookies มากลับหน้าหลัง
}

function createTodo(text) {
    const div = document.createElement("div"); // สร้าง div ใหม่
    div.id = "todo-list-item"
    div.textContent = text; // เอา text มาใส่ใน div เป็น content

    div.onclick = () => { //ใส่ให้คลิ๊กเพื่อ ลบ TODO list นั้นได้
        if (confirm("Delete this TO DO?")) { // ใส่ confirm ไว้เพื่อกดพลาด
            div.remove(); // เอาตัว div ออก
            saveTodos(); // บันทึกลงไปใหม่
        }
    };

    ftList.prepend(div); // ใส่บนสุดของ List
    saveTodos(); // บันทึกลงไปใน TODO List
}

newBtn.onclick = () => {
    const text = prompt("Enter a new TO DO:"); // เปิดหน้าต่าง prompt ให้กรอกข้อมูล TODO-List
    if (text && text.trim()) { // กันสร้าง TODO ที่ blank
        createTodo(text.trim());
    }
};

loadTodos(); // โหลด Todo ใหม่เสมอ