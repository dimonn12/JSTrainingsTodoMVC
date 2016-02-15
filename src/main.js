"use strict";
function addTodo(form, event) {
    let value = form['new-todo'].value;

    //I don't want to use document API to create elements and then to append them. JQuery is much easier!!!
    $("#todo-list").append(`<li name="todo-element">
    <div class="view">
        <input class="toggle" onchange="toggleCompleted(this)" type="checkbox">
        <label ondblclick="showEditForm(this)">${value}</label>
        <button class="destroy" onclick="removeTodo(this)"></button>
    </div>
    <form onsubmit="saveTodo(this, event)" class="hidden">
        <input name='edit-todo' class="edit" value="${value}"/>
    </form>
</li>`);
    form['new-todo'].value = '';
    filter();
    event.preventDefault();
};

function showEditForm(element) {
    $(element).parent("div.view").toggleClass("hidden");
    $(element).parent().siblings("form").toggleClass("hidden");
    $(element).parent().siblings("form input").focus();
}

function saveTodo(form, event) {
    form.classList.toggle("hidden");
    $(form).siblings("div.view").toggleClass("hidden");
    let newValue = form['edit-todo'].value;
    $(form).siblings("div.view").children("label").text(newValue);
    event.preventDefault();
}

function toggleAll(element) {
    let completed = element.checked;
    let elements = document.querySelectorAll("li[name='todo-element']");
    for (let i = 0; i < elements.length; i++) {
        if (completed) {
            elements[i].classList.add("completed");
        } else {
            elements[i].classList.remove("completed");
        }
        let $toggle = $(elements[i]).find("input.toggle").prop({"checked": completed})
    }
    filter();
};

function toggleCompleted(element) {
    $(element).parents("li[name='todo-element']").toggleClass('completed')
    filter();
};

function removeTodo(element) {
    $(element).parents("li[name='todo-element']").remove();
    filter();
};

function clearCompletedTodos() {
    let elements = $("li[name='todo-element'].completed");
    for (let i = 0; i < elements.length; i++) {
        $(elements[i]).remove();
    }
    filter();
};

function filter() {
    let elem = document.querySelector("#filters a[type='selector'].selected");
    elem.onclick.apply(elem);
};

function showAll(elem) {
    $(elem).parents("#filters").find("a[type='selector']").removeClass("selected");
    let $filteredCollection = $("li[name='todo-element']");
    document.getElementById("valueHolder").innerHTML = ($filteredCollection.length).toString();
    $filteredCollection.removeClass("hidden");

    elem.classList.add("selected");
};

function showActive(elem) {
    $(elem).parents("#filters").find("a[type='selector']").removeClass("selected");
    $("li[name='todo-element']").addClass("hidden");
    let $filteredCollection = $("li[name='todo-element']:not(.completed)");
    document.getElementById("valueHolder").innerHTML = ($filteredCollection.length).toString();
    $filteredCollection.removeClass("hidden");

    elem.classList.add("selected");
};

function showCompleted(elem) {
    $(elem).parents("#filters").find("a[type='selector']").removeClass("selected");
    $("li[name='todo-element']").addClass("hidden");
    let $filteredCollection = $("li[name='todo-element'].completed");
    document.getElementById("valueHolder").innerHTML = ($filteredCollection.length).toString();
    $filteredCollection.removeClass("hidden");

    elem.classList.add("selected");
};