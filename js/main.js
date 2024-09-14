// Selecting elements
let body = document.querySelector("body");

let divConfirm = body.querySelector(".div-confirm");
let sideBar = document.querySelector(".page aside ");
let ulSideBar = document.querySelector(".page aside ul");
let h2PageHeader = document.querySelector(".page main header h2");

let sectionMain = document.querySelector(".page main > .sec-main");

let Table = sectionMain.querySelector("table");

let tBodyTable = Table.querySelector("tbody");

let btnCreate = document.querySelector("#btn-create");
let btnGet = sectionMain.querySelector("#btn-get");
let spanMsg = document.querySelector(".page main > span");

let inputsStore = [
    { type: 'number', placeholder: 'id' },
    { type: 'text', placeholder: 'store_name' },
    { type: 'text', placeholder: 'store_address' },
    { type: 'number', placeholder: 'phone_number' }
];

let inputsInventory = [
    { type: 'number', placeholder: 'ingredient_id' },
    { type: 'number', placeholder: 'store_id' },
    { type: 'number', placeholder: 'quantity' },
    { type: 'text', placeholder: 'supplier' },
    { type: 'text', placeholder: 'expiry_date' }
];

let inputsIngredient = [
    { type: 'number', placeholder: 'id' },
    { type: 'text', placeholder: 'ingredient_name' },
    { type: 'number', placeholder: 'cost' },
];

let inputsMealIngredients = [
    { type: 'number', placeholder: 'meal_id' },
    { type: 'number', placeholder: 'ingredient_id' },
    { type: 'number', placeholder: 'quantity' },
];

let inputsMeal = [
    { type: 'number', placeholder: 'id' },
    { type: 'text', placeholder: 'meal_name' },
    { type: 'number', placeholder: 'meal_price' }
];

let inputsOrder = [
    { type: 'number', placeholder: 'id' },
    { type: 'number', placeholder: 'meal_id' },
    { type: 'number', placeholder: 'store_id' },
    { type: 'number', placeholder: 'quantity' },
];

let colorGreen = `var(--green-color)`;
let colorRed = `var(--red-color)`;

let limit = 10;
let page = 1;

let shouldExecuteDivActions = true;

// Event listeners

spanMsg.addEventListener('click', (event) => {
    if (event.target.id === 'xmark') {
        event.target.parentElement.style.cssText += "right : -500px;";
    }
});

btnGet.addEventListener('click', (event) => {
    let divActions = sectionMain.querySelector(".div-actions");

    if (divActions) {
        divActions.remove();
    }

    if (window.getComputedStyle(spanMsg).right !== '-500px') {
        spanMsg.style.cssText += "right: -500px;";
    }
});



if (h2PageHeader.textContent === "Stores") {
    let storeInputId = sectionMain.querySelector("#store_input_id");

    let booleanInputValue = false;
    if (!storeInputId.value) {
        booleanInputValue = true;
    }

    fetchGet(`http://localhost:3000/api/stores?page=${page}&limit=${limit}`, `stores`, booleanInputValue, page);

    btnGet.addEventListener('click', () => {
        handleGetStore(storeInputId.value);
    });

    btnCreate.addEventListener('click', handleCreateStore);

    tBodyTable.addEventListener('click', handleUpdateStore);

    tBodyTable.addEventListener('click', handleDeleteStore);

}
else if (h2PageHeader.textContent === "Inventory") {

    let ingredientInputId = sectionMain.querySelector("#ingredient_input_id");
    let storeInputId = sectionMain.querySelector("#store_input_id");

    let booleanInputValue = false;
    if (!ingredientInputId.value && !storeInputId.value) {
        booleanInputValue = true;
    }

    fetchGet(`http://localhost:3000/api/inventory?page=${page}&limit=${limit}`, `inventory`, booleanInputValue, page);

    btnGet.addEventListener('click', () => {
        handleGetInventory(ingredientInputId.value, storeInputId.value);
    });

    btnCreate.addEventListener('click', handleCreateInventory);

    tBodyTable.addEventListener('click', handleUpdateInventory);

    tBodyTable.addEventListener('click', handleDeleteInventory);

}
else if (h2PageHeader.textContent === "Ingredients") {

    let ingredientInputId = sectionMain.querySelector("#ingredient_input_id");

    let booleanInputValue = false;
    if (!ingredientInputId.value) {
        booleanInputValue = true;
    }

    fetchGet(`http://localhost:3000/api/ingredients?page=${page}&limit=${limit}`, `ingredients`, booleanInputValue, page);

    btnGet.addEventListener('click', () => {
        handleGetIngredient(ingredientInputId.value);
    });

    btnCreate.addEventListener('click', handleCreateIngredient);

    tBodyTable.addEventListener('click', handleUpdateIngredient);

    tBodyTable.addEventListener('click', handleDeleteIngredient);

}
else if (h2PageHeader.textContent === "Meal Ingredients") {
    let mealInputId = sectionMain.querySelector("#meal_input_id");
    let ingredientInputId = sectionMain.querySelector("#ingredient_input_id");

    let booleanInputValue = false;
    if (!mealInputId.value && !ingredientInputId.value) {
        booleanInputValue = true;
    }

    fetchGet(`http://localhost:3000/api/mealIngredients?page=${page}&limit=${limit}`, `mealIngredients`, booleanInputValue, page);

    btnGet.addEventListener('click', () => {
        handleGetMealIngredient(mealInputId.value, ingredientInputId.value);
    });

    btnCreate.addEventListener('click', handleCreateMealIngredient);

    tBodyTable.addEventListener('click', handleUpdateMealIngredient);

    tBodyTable.addEventListener('click', handleDeleteMealIngredient);
}
else if (h2PageHeader.textContent === "Meals") {
    let mealInputId = sectionMain.querySelector("#meal_input_id");

    let booleanInputValue = false;
    if (!mealInputId.value) {
        booleanInputValue = true;
    }

    fetchGet(`http://localhost:3000/api/meals?page=${page}&limit=${limit}`, `meals`, booleanInputValue, page);

    btnGet.addEventListener('click', () => {
        handleGetMeal(mealInputId.value)
    });

    btnCreate.addEventListener('click', handleCreateMeal);

    tBodyTable.addEventListener('click', handleUpdateMeal);

    tBodyTable.addEventListener('click', handleDeleteMeal);

}
else if (h2PageHeader.textContent === "Orders") {
    let orderInputId = sectionMain.querySelector("#order_input_id");
    let mealInputId = sectionMain.querySelector("#meal_input_id");
    let storeInputId = sectionMain.querySelector("#store_input_id");

    let booleanInputValue = false;
    if (!orderInputId.value) {
        booleanInputValue = true;
    }

    fetchGet(`http://localhost:3000/api/orders?page=${page}&limit=${limit}`, `orders`, booleanInputValue, page);

    btnGet.addEventListener('click', () => {
        handleGetOrder(orderInputId.value, mealInputId.value, storeInputId.value)
    });

    btnCreate.addEventListener('click', handleCreateOrder);

    tBodyTable.addEventListener('click', handleUpdateOrder);

    tBodyTable.addEventListener('click', handleDeleteOrder);
}
else if (h2PageHeader.textContent === "Sales") {
    let mealInputId = sectionMain.querySelector("#meal_input_id");
    let storeInputId = sectionMain.querySelector("#store_input_id");

    let booleanInputValue = false;
    if (!mealInputId.value && !storeInputId.value) {
        booleanInputValue = true;
    }

    shouldExecuteDivActions = false;

    fetchGet(`http://localhost:3000/api/sales?page=${page}&limit=${limit}`, `sales`, booleanInputValue, page)

    btnGet.addEventListener('click', () => {
        handleGetSale(mealInputId.value, storeInputId.value)
    });
}





// handle store get

function handleGetStore(storeId) {
    btnGet.disabled = true;

    if (!storeId) {

        fetchGet(`http://localhost:3000/api/stores?page=${page}&limit=${limit}`, `stores`, true, page)

    } else if (storeId) {

        fetchGetRow(`http://localhost:3000/api/stores/${storeId}`);

    }

    enableButtonAfterDelay(btnGet);
}

// handle store create

function handleCreateStore(event) {
    let btn = event.target;
    btn.disabled = true;

    showInputsForActions('Create', [
        { type: 'text', placeholder: 'store_name' },
        { type: 'text', placeholder: 'store_address' },
        { type: 'number', placeholder: 'phone_number' }
    ])
        .then(btnAction => {
            btnAction.onclick = (event) => {
                clickCreate(event, `stores`, `store`)
            };
        });

    enableButtonAfterDelay(btn);
}

// handle store update

function handleUpdateStore(event) {
    if (event.target.id === `btn-update`) {
        let btn = event.target.parentElement;
        btn.disabled = true;

        showInputsForActions('Update', inputsStore)
            .then(btnAction => {
                return fillFields(event, btnAction);
            })
            .then(([btnAction, tr]) => {
                btnAction.onclick = (event) => {
                    let id = sectionMain.querySelector(`.div-actions input[placeholder="id"]`).value;
                    clickUpdate(event, `http://localhost:3000/api/stores/${id}`, `stores`, `store`, tr);
                }
            })

        enableButtonAfterDelay(btn);
    }
}

// handle store delete

function handleDeleteStore(event) {
    if (event.target.id === `btn-delete`) {
        let btn = event.target.parentElement;
        btn.disabled = true;

        let tr = event.target.parentElement.parentElement.parentElement;
        let id = tr.querySelector(`#id`).textContent;
        showConfirmDialog(`http://localhost:3000/api/stores/${id}`, `stores`, `store`, tr);

        enableButtonAfterDelay(btn);
    }
}

//  ----------------------------

//  handle inventory get 

function handleGetInventory(ingredientId, storeId) {
    btnGet.disabled = true;

    if (!ingredientId && !storeId) {
        fetchGet(`http://localhost:3000/api/inventory?page=${page}&limit=${limit} `, `inventory`, true, page)
    }
    else if (ingredientId && !storeId) {
        fetchGet(`http://localhost:3000/api/inventory/ingredient/${ingredientId}?limit=${limit}`, `inventory/ingredient/${ingredientId}`, true, page);
    }
    else if (storeId && !ingredientId) {
        fetchGet(`http://localhost:3000/api/inventory/store/${storeId}?page=${page}&limit=${limit}`, `inventory/store/${storeId}`, true, page);
    }
    else {
        fetchGetRow(`http://localhost:3000/api/inventory/${ingredientId},${storeId}`);
    }

    enableButtonAfterDelay(btnGet);
}


// handle inventory create

function handleCreateInventory(event) {
    let btn = event.target;
    btn.disabled = true;

    showInputsForActions('Create', inputsInventory)
        .then(btnAction => {
            btnAction.onclick = (event) => {
                clickCreate(event, `inventory`, `inventory`)
            };
        });

    enableButtonAfterDelay(btn);
}

// handle inventory update

function handleUpdateInventory(event) {
    if (event.target.id === `btn-update`) {
        let btn = event.target.parentElement;
        btn.disabled = true;

        showInputsForActions('Update', inputsInventory)
            .then(btnAction => {
                return fillFields(event, btnAction);
            })
            .then(([btnAction, tr]) => {
                btnAction.onclick = (event) => {
                    let ingredient_id = sectionMain.querySelector(`.div-actions input[placeholder="ingredient_id"]`).value;
                    let store_id = sectionMain.querySelector(`.div-actions input[placeholder="store_id"]`).value;
                    clickUpdate(event, `http://localhost:3000/api/inventory/${ingredient_id},${store_id}`, `inventory`, `inventory`, tr);
                }
            })

        enableButtonAfterDelay(btn);
    }
}

// handle inventory delete

function handleDeleteInventory(event) {
    if (event.target.id === `btn-delete`) {
        let btn = event.target.parentElement;
        btn.disabled = true;

        let tr = event.target.parentElement.parentElement.parentElement;
        let ingredient_id = tr.querySelector(`#ingredient_id`).textContent;
        let store_id = tr.querySelector(`#store_id`).textContent;
        showConfirmDialog(`http://localhost:3000/api/inventory/${ingredient_id},${store_id}`, `inventory`, `inventory`, tr);

        enableButtonAfterDelay(btn);
    }

}

//  ----------------------------

//  handle ingredient get 

function handleGetIngredient(ingredientId) {
    btnGet.disabled = true;

    if (!ingredientId) {
        fetchGet(`http://localhost:3000/api/ingredients?page=${page}&limit=${limit} `, `ingredients`, true, page)
    }
    else if (ingredientId) {
        fetchGetRow(`http://localhost:3000/api/ingredients/${ingredientId}?limit=${limit}`);
    }

    enableButtonAfterDelay(btnGet);
}


// handle ingredient create

function handleCreateIngredient(event) {
    let btn = event.target;
    btn.disabled = true;

    showInputsForActions('Create',
        [
            { type: 'text', placeholder: 'ingredient_name' },
            { type: 'number', placeholder: 'cost' }
        ])
        .then(btnAction => {
            btnAction.onclick = (event) => {
                clickCreate(event, `ingredients`, `ingredient`)
            };
        });

    enableButtonAfterDelay(btn);
}

// handle ingredient update

function handleUpdateIngredient(event) {
    if (event.target.id === `btn-update`) {
        let btn = event.target.parentElement;
        btn.disabled = true;

        showInputsForActions('Update', inputsIngredient)
            .then(btnAction => {
                return fillFields(event, btnAction);
            })
            .then(([btnAction, tr]) => {
                btnAction.onclick = (event) => {
                    let ingredient_id = sectionMain.querySelector(`.div-actions input[placeholder="id"]`).value;
                    clickUpdate(event, `http://localhost:3000/api/ingredients/${ingredient_id}`, `ingredients`, `ingredient`, tr);
                }
            })

        enableButtonAfterDelay(btn);
    }
}

// handle ingredient delete

function handleDeleteIngredient(event) {
    if (event.target.id === `btn-delete`) {
        let btn = event.target.parentElement;
        btn.disabled = true;

        let tr = event.target.parentElement.parentElement.parentElement;
        let ingredient_id = tr.querySelector(`#id`).textContent;
        showConfirmDialog(`http://localhost:3000/api/ingredients/${ingredient_id}`, `ingredients`, `ingredient`, tr);

        enableButtonAfterDelay(btn);
    }

}

//  ----------------------------

//  handle meal ingredient get 

function handleGetMealIngredient(mealId, ingredientId) {
    btnGet.disabled = true;

    if (!mealId && !ingredientId) {
        fetchGet(`http://localhost:3000/api/mealIngredients?page=${page}&limit=${limit} `, `mealIngredients`, true, page)
    }

    else if (mealId && !ingredientId) {
        fetchGet(`http://localhost:3000/api/mealIngredients/meal/${mealId}?limit=${limit}`, `mealIngredients/meal/${mealId}`, true, page);
    }

    else if (ingredientId && !mealId) {
        fetchGet(`http://localhost:3000/api/mealIngredients/ingredient/${ingredientId}?page=${page}&limit=${limit}`, `mealIngredients/ingredient/${ingredientId}`, true, page);
    }

    else {
        fetchGetRow(`http://localhost:3000/api/mealIngredients/${mealId},${ingredientId}`);
    }

    enableButtonAfterDelay(btnGet);
}

// handle meal ingredient create

function handleCreateMealIngredient(event) {
    let btn = event.target;
    btn.disabled = true;

    showInputsForActions('Create', inputsMealIngredients)
        .then(btnAction => {
            btnAction.onclick = (event) => {
                clickCreate(event, `mealIngredients`, `meal ingredient`)
            };
        });

    enableButtonAfterDelay(btn);
}

// handle meal ingredient update

function handleUpdateMealIngredient(event) {
    if (event.target.id === `btn-update`) {
        let btn = event.target.parentElement;
        btn.disabled = true;

        showInputsForActions('Update', inputsMealIngredients)
            .then(btnAction => {
                return fillFields(event, btnAction);
            })
            .then(([btnAction, tr]) => {
                btnAction.onclick = (event) => {
                    let meal_id = sectionMain.querySelector(`.div-actions input[placeholder="meal_id"]`).value;
                    let ingredient_id = sectionMain.querySelector(`.div-actions input[placeholder="ingredient_id"]`).value;
                    clickUpdate(event, `http://localhost:3000/api/mealIngredients/${meal_id},${ingredient_id}`, `mealIngredients`, `meal ingredient`, tr);
                }
            })

        enableButtonAfterDelay(btn);
    }
}

// handle meal ingredient delete

function handleDeleteMealIngredient(event) {
    if (event.target.id === `btn-delete`) {
        let btn = event.target.parentElement;
        btn.disabled = true;

        let tr = event.target.parentElement.parentElement.parentElement;
        let meal_id = tr.querySelector(`#meal_id`).textContent;
        let ingredient_id = tr.querySelector(`#ingredient_id`).textContent;
        showConfirmDialog(`http://localhost:3000/api/mealIngredients/${meal_id},${ingredient_id}`, `mealIngredients`, `meal ingredient`, tr);

        enableButtonAfterDelay(btn);
    }

}

//  ----------------------------

// handle meal get

function handleGetMeal(mealId) {
    btnGet.disabled = true;

    if (!mealId) {

        fetchGet(`http://localhost:3000/api/meals?page=${page}&limit=${limit}`, `meals`, true, page)

    } else if (mealId) {

        fetchGetRow(`http://localhost:3000/api/meals/${mealId}`);

    }

    enableButtonAfterDelay(btnGet);
}

// handle meal create

function handleCreateMeal(event) {
    let btn = event.target;
    btn.disabled = true;

    showInputsForActions('Create', [
        { type: 'text', placeholder: 'meal_name' },
        { type: 'number', placeholder: 'meal_price' }
    ])
        .then(btnAction => {
            btnAction.onclick = (event) => {
                clickCreate(event, `meals`, `meal`)
            };
        });

    enableButtonAfterDelay(btn);
}

// handle meal update

function handleUpdateMeal(event) {
    if (event.target.id === `btn-update`) {
        let btn = event.target.parentElement;
        btn.disabled = true;

        showInputsForActions('Update', inputsMeal)
            .then(btnAction => {
                return fillFields(event, btnAction);
            })
            .then(([btnAction, tr]) => {
                btnAction.onclick = (event) => {
                    let id = sectionMain.querySelector(`.div-actions input[placeholder="id"]`).value;
                    clickUpdate(event, `http://localhost:3000/api/meals/${id}`, `meals`, `meal`, tr);
                }
            })

        enableButtonAfterDelay(btn);
    }
}

// handle meal delete

function handleDeleteMeal(event) {
    if (event.target.id === `btn-delete`) {
        let btn = event.target.parentElement;
        btn.disabled = true;

        let tr = event.target.parentElement.parentElement.parentElement;
        let id = tr.querySelector(`#id`).textContent;
        showConfirmDialog(`http://localhost:3000/api/meals/${id}`, `meals`, `meal`, tr);

        enableButtonAfterDelay(btn);
    }
}

//  ----------------------------

// handle order get

function handleGetOrder(orderId, mealId, storeId) {
    btnGet.disabled = true;

    if (!orderId && !mealId && !storeId) {
        fetchGet(`http://localhost:3000/api/orders?page=${page}&limit=${limit}`, `orders`, true, page)
    }
    else if (orderId && !mealId && !storeId) {
        fetchGetRow(`http://localhost:3000/api/orders/${orderId}`);
    }
    else if (!orderId && mealId && !storeId) {
        fetchGet(`http://localhost:3000/api/orders/meal/${mealId}?limit=${limit}`, `orders/meal/${mealId}`, true, page);
    }
    else if (!orderId && !mealId && storeId) {
        fetchGet(`http://localhost:3000/api/orders/store/${storeId}?limit=${limit}`, `orders/store/${storeId}`, true, page);
    }

    enableButtonAfterDelay(btnGet);
}

// handle order create

function handleCreateOrder(event) {
    let btn = event.target;
    btn.disabled = true;

    showInputsForActions('Create', [
        { type: 'number', placeholder: 'meal_id' },
        { type: 'number', placeholder: 'store_id' },
        { type: 'number', placeholder: 'quantity' },
    ])
        .then(btnAction => {
            btnAction.onclick = (event) => {
                clickCreate(event, `orders`, `order`)
            };
        });

    enableButtonAfterDelay(btn);
}

// handle order update

function handleUpdateOrder(event) {
    if (event.target.id === `btn-update`) {
        let btn = event.target.parentElement;
        btn.disabled = true;

        showInputsForActions('Update', inputsOrder)
            .then(btnAction => {
                return fillFields(event, btnAction);
            })
            .then(([btnAction, tr]) => {
                btnAction.onclick = (event) => {
                    let id = sectionMain.querySelector(`.div-actions input[placeholder="id"]`).value;
                    clickUpdate(event, `http://localhost:3000/api/orders/${id}`, `orders`, `order`, tr);
                }
            })

        enableButtonAfterDelay(btn);
    }
}

// handle order delete

function handleDeleteOrder(event) {
    if (event.target.id === `btn-delete`) {
        let btn = event.target.parentElement;
        btn.disabled = true;

        let tr = event.target.parentElement.parentElement.parentElement;
        let id = tr.querySelector(`#id`).textContent;
        showConfirmDialog(`http://localhost:3000/api/orders/${id}`, `orders`, `order`, tr);

        enableButtonAfterDelay(btn);
    }
}



// handle sales get

function handleGetSale(mealId, storeId) {
    btnGet.disabled = true;

    if (!mealId && !storeId) {
        fetchGet(`http://localhost:3000/api/sales?page=${page}&limit=${limit}`, `sales`, true, page)
    }
    else if (mealId && !storeId) {
        fetchGet(`http://localhost:3000/api/sales/meal/${mealId}?page=${page}&limit=${limit}`, `sales/meal/${mealId}`, true, page);
    }
    else if (!mealId && storeId) {
        fetchGet(`http://localhost:3000/api/sales/store/${storeId}?page=${page}&limit=${limit}`, `sales/store/${storeId}`, true, page);
    }

    enableButtonAfterDelay(btnGet);
}











// functions fetch

//  get

async function dataFetchGet(url, page) {
    let data = fetch(url)
        .then(rows => rows.json())
        .then(rows => rows.data)
        .then(rows => {
            let pagesText = sectionMain.querySelector("footer div:first-child small");
            if (rows.length) {
                rows.forEach(row => {

                    let Row = TrInHtml(row);

                    let pages = row.rowCount / limit;
                    pages = Math.ceil(pages);

                    tBodyTable.innerHTML += Row;

                    pagesText.innerHTML = `page ${page} of ${pages} pages`
                })
            } else {
                pagesText.innerHTML = `page ${1}`
            }
            return rows;
        })
        .catch(err => console.log(Error(err)));

    return data
}

function switchPages(url, direction) {
    let currentPage = sectionMain.querySelector("footer small").innerText.split(' ')[1];
    let lastPage = sectionMain.querySelector("footer small").innerText.split(' ')[3];

    if (currentPage != '1' && currentPage != '0' && direction === "left") {
        tBodyTable.innerHTML = '';
        dataFetchGet(url, currentPage - 1)
    }
    if (currentPage != lastPage && direction === "right") {
        tBodyTable.innerHTML = '';
        dataFetchGet(url, + currentPage + 1)
    }
}

async function fetchGet(url, tableFetch, booleanInputValue, page) {
    tBodyTable.innerHTML = "";

    sectionMain.querySelectorAll('footer #btns-arrow #btn-angle').forEach(btn => {
        btn.disabled = false;
    })

    dataFetchGet(url, page)
        .then((res) => {
            sectionMain.querySelector('footer #btns-arrow').onclick = (event) => {
                if (booleanInputValue) {
                    let btn = event.target.parentElement;
                    btn.disabled = true;
                    let currentPage = sectionMain.querySelector("footer small").innerText.split(' ')[1];

                    if (event.target.className === "fa-solid fa-angle-left") {
                        switchPages(`http://localhost:3000/api/${tableFetch}?page=${currentPage - 1}&limit=${limit}`, 'left');
                    } else if (event.target.className === "fa-solid fa-angle-right") {
                        switchPages(`http://localhost:3000/api/${tableFetch}?page=${+ currentPage + 1}&limit=${limit}`, 'right');
                    }

                    enableButtonAfterDelay(btn);
                }
            }
        });

}

function fetchGetRow(url) {
    fetch(url)
        .then(row => row.json())
        .then(row => {
            if (row.status === "success") {
                let Row = TrInHtml(row.data);
                tBodyTable.innerHTML = Row;
            } else {
                tBodyTable.innerHTML = "";
            }
            sectionMain.querySelector("footer div:first-child small").innerHTML = `page 1`;

            sectionMain.querySelectorAll('footer #btns-arrow #btn-angle').forEach(btn => {
                btn.disabled = true;
            });
        })
        .then(() => enableButtonAfterDelay(btnGet));

}

// create

function clickCreate(event, tableFetch, tableType) {
    let btn = event.target;
    btn.disabled = true;

    let inputsValues = validData();

    if (inputsValues[0]) {
        let objData = inputsValues[1];
        let currentPage = sectionMain.querySelector("footer small").innerText.split(' ')[1];
        fetchCreate(objData, tableFetch, tableType, currentPage);
    }

    enableButtonAfterDelay(btn);
}

function fetchCreate(objData, tableFetch, tableType, currentPage) {
    fetch(`http://localhost:3000/api/${tableFetch}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(objData),
    })
        .then(res => res.json())
        .then(res => {
            const status = res.status;
            if (status === "success") {
                showMessage(`The ${tableType} has been created successfully`, colorGreen, true);
                fetchGet(`http://localhost:3000/api/${tableFetch}?page=${currentPage}&limit=${limit} `, tableFetch, true, currentPage)
            } else {
                const message = status === "fail" ? res.message : "Invalid ingredient id or store id, check if they exist";
                showMessage(message, colorRed);
            }
        });

}


// update

function clickUpdate(event, url, tableFetch, tableType, tr) {
    let btn = event.target;
    btn.disabled = true;

    let objData = {};

    sectionMain.querySelectorAll(".div-actions input").forEach(input => {
        if (tr.querySelector(`#${input.placeholder}`).innerHTML != input.value && input.value && input.placeholder.slice(-2) != "id") {
            objData[input.placeholder] = input.value;
        }
    });

    if (Object.keys(objData).length) {
        let currentPage = sectionMain.querySelector("footer small").innerText.split(' ')[1];
        fetchUpdate(url, tableFetch, tableType, objData, currentPage);
    }

    enableButtonAfterDelay(btn);
}

function fetchUpdate(url, tableFetch, tableType, objData, currentPage) {
    fetch(url, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(objData),
    })
        .then(res => res.json())
        .then(res => {
            const status = res.status;
            if (status === "success") {
                showMessage(`The ${tableType} has been updated successfully`, colorGreen, true);
                fetchGet(`http://localhost:3000/api/${tableFetch}?page=${currentPage}&limit=${limit}`, tableFetch, true, currentPage)
            } else {
                const message = status === "fail" ? res.message : "Invalid ingredient id or store id, check if they exist";
                showMessage(message, colorRed);
            }
        });
}

// delete

function showConfirmDialog(url, tableFetch, tableType) {
    body.classList.add("confirm-overlay");
    divConfirm.classList.add("show-div-confirm");
    window.scrollTo({
        left: 0,
        top: 0,
        behavior: "smooth",
    });

    divConfirm.onclick = (event) => {
        clickDelete(event, url, tableFetch, tableType);
    };
}

function clickDelete(event, url, tableFetch, tableType) {
    let btn = event.target;
    btn.disabled = true;

    if (btn.id === "btn-cancel") {
        body.classList.remove("confirm-overlay");
        divConfirm.classList.remove("show-div-confirm");
    }

    if (btn.id === "btn-confirm") {
        let currentPage = sectionMain.querySelector("footer small").innerText.split(' ')[1];
        let lastPage = sectionMain.querySelector("footer small").innerText.split(' ')[3];
        if (currentPage === lastPage && currentPage != 1) {
            fetchDelete(url, tableFetch, tableType, currentPage - 1);
        } else {
            fetchDelete(url, tableFetch, tableType, currentPage);
        }
    }

    enableButtonAfterDelay(btn);
}

function fetchDelete(url, tableFetch, tableType, currentPage) {
    fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then(res => res.json())
        .then(res => {
            const status = res.status;
            if (status === "success") {
                showMessage(`The ${tableType} has been deleted successfully`, colorGreen, true);
                fetchGet(`http://localhost:3000/api/${tableFetch}?page=${currentPage}&limit=${limit} `, tableFetch, true, currentPage)
            } else {
                const message = status === "fail" ? res.message : "Invalid ingredient id or store id, check if they exist";
                showMessage(message, colorRed);
            }
        })
        .then(res => {
            body.classList.remove("confirm-overlay");
            divConfirm.classList.remove("show-div-confirm");
        })
}











// functions dom
function TrInHtml(data) {
    let row = `<tr>`;

    for (const key in data) {
        if (key != `rowCount`) {
            const value = data[key];
            row += `<td id="${key}" data-label="${key}">${value}</td>`;
        }
    }

    if (shouldExecuteDivActions) {
        row += `<td id="actions"  style="display:block;">
                        <button>
                            <i id="btn-update" class="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button>
                            <i id="btn-delete" class="fa-solid fa-trash"></i>
                        </button>
                    </td>
                </tr>`;
    } else {
        row += `</tr>`
    }

    return row;
}

function removeIfExistsDivActions() {
    let divActions = sectionMain.querySelector(".div-actions");
    if (divActions) {
        divActions.remove();
    }
}

function showMessage(text, color, deleteInputs) {
    spanMsg.querySelector("span").textContent = text;

    spanMsg.style.cssText = `right: 15px;  border-left: 15px solid ${color};`;

    if (deleteInputs) {
        removeIfExistsDivActions();
    }

    setTimeout(() => {
        if (window.getComputedStyle(spanMsg).right !== '-500px') {
            spanMsg.style.cssText += "right: -500px;";
        }
    }, 3000)
}

async function showInputsForActions(actionName, arrInputs) {
    removeIfExistsDivActions();

    let divActions = document.createElement("div");
    divActions.className = "div-actions between-flex f-wrap ";

    let divInputs = document.createElement("div");
    divInputs.className = "div-inputs p-10 rad-6 w-fit";
    divInputs.style.cssText = "background-color:#444;  margin: 10px 0;"

    arrInputs.forEach(input => {
        divInputs.innerHTML += `<input type="${input.type}" placeholder="${input.placeholder}">`;
    });

    // divInputs.innerHTML = `
    //     <input type="number" placeholder="ingredient_id">
    //     <input type="number" placeholder="store_id">
    //     <input type="number" placeholder="quantity">
    //     <input type="text" placeholder="supplier">
    //     <input type="number "placeholder="expiry_date">
    // `;

    let btnAction = document.createElement("button");
    btnAction.textContent = actionName;
    btnAction.className = "rad-6 p-10 c-white tran-3s";
    btnAction.style.cssText = "background-color: #22c55e; border:1px solid #22c55e;  height: fit-content; font-weight: 600; ";

    divActions.append(divInputs, btnAction);
    sectionMain.append(divActions);
    return btnAction;
}

function fillFields(event, btnAction) {
    let tr = event.target.parentElement.parentElement.parentElement;
    sectionMain.querySelectorAll(".div-actions input").forEach(input => {
        input.value = tr.querySelector(`#${input.placeholder}`).textContent;
    });
    return [btnAction, tr];
}



// functions js

function validData() {
    let inputs = document.querySelectorAll(".page .sec-main>.div-actions .div-inputs input");

    let allFilled = true;
    let allInputsValues = {};

    inputs.forEach((input) => {
        input.style.cssText = "border: 1px solid ;";
        let inputValue = input.value.trim();

        if (!inputValue) {
            allFilled = false;
            input.style.cssText = "border: 3px solid #f44336;";
            showMessage(`the required fields`, colorRed)
            return;
        } else {
            allInputsValues[input.placeholder] = inputValue;
        }
    });

    return [allFilled, allInputsValues];
}

function enableButtonAfterDelay(button) {
    setTimeout(() => {
        button.disabled = false;
    }, 2000);
}