const wrapper = document.querySelector(".wrapper");
const backBtn = document.querySelector(".back-btn");
const menuBtn = document.querySelector(".menu-btn");

const toggleScreen =() => {
    wrapper.classList.toggle("show-category");
};

menuBtn.addEventListener("click",toggleScreen);
backBtn.addEventListener("click",toggleScreen);

// ✅ Updated Back Button Action
backBtn.addEventListener("click", () => {
    wrapper.classList.remove("show-category");
    renderCategories();  // update category task counts
    calculateTotal();    // update total tasks number
});



const addTaskBtn = document.querySelector(".add-task-btn");
const addTaskForm = document.querySelector(".add-task");
const blackBackdrop = document.querySelector(".black-backdrop");

const toggleAddTaskForm = () => {
    addTaskForm.classList.toggle("active");
    blackBackdrop.classList.toggle("active");
    addTaskBtn.classList.toggle("active");
};

addTaskBtn.addEventListener("click",toggleAddTaskForm);
blackBackdrop.addEventListener("click",toggleAddTaskForm);

// lets add categories and task with js

let categories = [
    {
        title: "أهدافي الشخصية",
        img: "boy.png",
    },

    {
        title: "مهامي في العمل",
        img: "work.png",
    },

    {
        title: "التمارين الرياضية",
        img: "workout.png",
    },

    {
        title: "المقاضي",
        img: "shopping.png",
    },
     {
        title: "اهداف العام القادم",
        img: "calendar.png",
    },
];

let tasks = [
    {
        id: 1,
        task: "Go to market",
        category:"shopping",
        completed: false,
    },

    {
        id: 2,
        task: "do push up",
        category:"Workout",
        completed: false,
    },

    {
        id: 3,
        task: "finish your work",
        category:"Work",
        completed: false,
    },

    {
        id: 4,
        task: "visit friends",
        category:"Personal",
        completed: false,
    },

];


let selectedCategory = categories[0];

const categoriesContainer = document.querySelector(".categories");
const categoryTitle = document.querySelector(".category-title");
const totalCategoryTasks = document.querySelector(".category-tasks");
const categoryImg = document.querySelector("#category-img");
const totalTasks = document.querySelector(".totalTasks");

const calculateTotal = () => {
  const categoryTasks = tasks.filter(
            (task) => task.category.toLowerCase() === selectedCategory.title.
            toLowerCase()
        );
        //task insaide categroy
        totalCategoryTasks.innerHTML = `${categoryTasks.length} عدد المهام `;
        totalTasks.innerHTML = tasks.length;

};


const renderCategories = () => {
    categoriesContainer.innerHTML = "";
    categories.forEach((category) => {
        // get all the tasks of current category
        const categoryTasks = tasks.filter(
            (task) => task.category.toLowerCase() === category.title.
            toLowerCase()
        );

        // creat a div to render category 
        const div = document.createElement("div");
        div.classList.add("category");
        div.addEventListener("click" , () => {
            wrapper.classList.add("show-category");
            selectedCategory = category;
            categoryTitle.innerHTML = category.title;
            categoryImg.src = `images/${category.img}`;
            calculateTotal();
            //render tasks when category cahnge
            renderTasks();
            
        });
        div.innerHTML =`
                                <div class="left">
                           <img src="images/${category.img}"
                            alt="${category.title}"/>
                           <div class="content">
                              <h1>${category.title}</h1>
                              <p>${categoryTasks.length} عدد المهام لهذا القسم </p>
                           </div>
                        </div>
                        <div class="options">
                         <div class="toggle-btn">
                               <svg
                               xmlns="http://www.w3.org/2000/svg"
                               fill="none"
                               viewBox="0 0 24 24"
                               stroke-width="1.5"
                               stroke="currentColor"
                               class="w-6 h-6"
                               >
                               <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"                                
                               />
                              </svg>
                            </div>
                        </div>
        `;
        categoriesContainer.appendChild(div);

    });
    
};


const tasksContainer = document.querySelector(".tasks");

const renderTasks = () => {
    tasksContainer.innerHTML ="";
     const categoryTasks = tasks.filter(
         (task) =>
            task.category.toLowerCase() === selectedCategory.title.toLowerCase()
         
        );
        

        //if no task for selected category
        if (categoryTasks.length === 0) {
         
            tasksContainer.innerHTML  = `
            <p class="no-task">لاضافة المهام اضفط + في الاسفل</p>
            `;
          
            // text insaide catagory
            totalCategoryTasks.innerHTML =  `
            <p>لايوجد مهام اليوم إبدا التخطيط ليومك </p>
            `;
         
          
          
         
            
         
          
          
           
           
        } else {
            // if there are tasks for selected category render them
            categoryTasks.forEach((task) => {
                const div = document.createElement("div");
                div.classList.add("task-wrapper");
                const label = document.createElement("label");
                label.classList.add("task");
                label.setAttribute("for",task.id);
                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.id = task.id;
                checkbox.checked = task.completed;

                //add completion functionality on click checkbox
                checkbox.addEventListener("change", () => {
                    const index = tasks.findIndex((t) => t.id === task.id);
                //change the true to false or vice versa
                    tasks[index].completed = !tasks[index].completed;
                // save in local
                    saveLocal();
                });

                div.innerHTML = `
                  <div class="delete">
                            <svg
                               xmlns="http://www.w3.org/2000/svg"
                               fill="none"
                               viewBox="0 0 24 24"
                               stroke-width="1.5"
                               stroke="currentColor"
                               class="w-6 h-6"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                                />            
                        </svg>
                        </div>
                
                
                `;

                label.innerHTML = `
                <span class="checkmark">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="w-6 h-6"
                              >
                               <path
                                 stroke-linecap="round"
                                 stroke-linejoin="round"
                                 d="M4.5 12.75l6 6 9-13.5"
                                /> 
                                </svg>
                            </span>
                            <p>${task.task}</p>
                `;

                label.prepend(checkbox);
                div.prepend(label);
                tasksContainer.appendChild(div);

                //delete functionality

                const deleteBtn = div.querySelector(".delete");
                deleteBtn.addEventListener("click", () => {
                    const index = tasks.findIndex((t) => t.id === task.id);

                    
                    //remove the clicked task
                    tasks.splice(index, 1);
                    saveLocal();
                    renderTasks();
                    


                    
                });

            });
            
            renderCategories();
            calculateTotal();    
            
        }
 
     

};

//save and get tasks from local storag
const saveLocal = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};
const getlocal = () => {
    const localTasks = JSON.parse(localStorage.getItem("tasks"));

// if tasks found

if(localTasks) {
    tasks = localTasks;
}

};

// lets add functionality to add new tasks


//render all the categories in select
const categorySelect = document.querySelector("#category-select");
const cancelBtn = document.querySelector(".cancel-btn");
const addBtn = document.querySelector(".add-btn");

const taskInput = document.querySelector("#task-input");

cancelBtn.addEventListener("click", toggleAddTaskForm);

addBtn.addEventListener("click", () => {
    const task = taskInput.value;
    const category = categorySelect.value;


        // Check for repeated letters in English or Arabic
    if (/([a-zA-Z\u0600-\u06FF])\1{10,}/.test(task)) {
        alert("ممنوع استخدام الكلمات العشوائية!");
        return;
    }

    if (task === "") {
        alert("يجب تسجيل المهام قبل الاضافة");
    } else {
        const newTask = {
            id: tasks.length + 1,
            task,
            category,
            completed: false,
        };
        tasks.push(newTask);
        taskInput.value= "";
        saveLocal();
        toggleAddTaskForm();
        renderTasks();
      
    }

});

categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.title.toLowerCase();
    option.textContent = category.title;
    categorySelect.appendChild(option);
});




// these all are already stored tasks

getlocal();
renderTasks();
renderCategories();
calculateTotal();


