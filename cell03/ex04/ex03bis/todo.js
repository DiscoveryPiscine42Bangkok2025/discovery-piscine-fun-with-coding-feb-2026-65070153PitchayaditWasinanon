const ftList = $("#ft_list");
const newBtn = $("#new-btn");

function saveTodos() { // บันทึก To-do List
    const todos = []; // List ของ todos
    ftList.children("div").each(function () {
        todos.push($(this).text());
    }); //push ข้อมูลใหม่เข้าไปใน List เดิมที่มีอยู่
    document.cookie = "todos=" + encodeURIComponent(JSON.stringify(todos)); // เก็บเข้าไปใน cookies
}

function loadTodos() { // load TODO ที่เก็บไว้
    const match = document.cookie.match(/todos=([^;]+)/); // หา todo ใน cookies
    if (!match) return; // ถ้าไม่มีจะออกจาก function นี้ทันที

    const todos = JSON.parse(decodeURIComponent(match[1])); // แปลงข้อมูลจาก cookie เป็น JSON
    todos.reverse().forEach(function (text) {
        createTodo(text);
    }); // นำ List TODO ที่ได้จาก cookies มากลับหน้าหลัง
}

function createTodo(text) {
    const div = $("<div></div>") // สร้าง div ใหม่
        .attr("id", "todo-list-item")
        .text(text); // เอา text มาใส่ใน div เป็น content

    div.click(function () { //ใส่ให้คลิ๊กเพื่อ ลบ TODO list นั้นได้
        if (confirm("Delete this TO DO?")) { // ใส่ confirm ไว้เพื่อกดพลาด
            $(this).remove(); // เอาตัว div ออก
            saveTodos(); // บันทึกลงไปใหม่
        }
    });

    ftList.prepend(div); // ใส่บนสุดของ List
    saveTodos(); // บันทึกลงไปใน TODO List
}

newBtn.click(function () {
    const text = prompt("Enter a new TO DO:"); // เปิดหน้าต่าง prompt ให้กรอกข้อมูล TODO-List
    if (text && text.trim()) { // กันสร้าง TODO ที่ blank
        createTodo(text.trim());
    }
});

loadTodos(); // โหลด Todo ใหม่เสมอ