class Row {

    static createInput (second, parametr = null, value = null) {
        var td = document.createElement('td');
        if (second) td.style.borderRight = 'none';
        var input = document.createElement('input');
        input.type = "text";
        input.className = "tableInput";
        if (value != null) input.value = value;
        if (parametr == 'Parametrs') {
            if (!second) input.classList += ' parKey';
            else input.classList += ' parVal';
            input.addEventListener('input', () => { Row.pasteParametrs() }); 
        }
        if (parametr == 'Headers') {
            if (!second) { 
                input.setAttribute('list', 'headKey');
                input.classList += ' headKey';
            }
            else 
                input.classList += ' headVal';
        }
        if (parametr == 'Data') {
            if (!second)  
                input.classList += ' dataKey';
            else 
                input.classList += ' dataVal';
        }
        input.addEventListener('input', () => { Row.addOnInput(input)}); 
        td.appendChild(input);
        return td;
    }

    static addOnInput(el) {
        var row = el.parentElement.parentElement;
        var table = el.parentElement.parentElement.parentElement;
        if (row.rowIndex == table.rows.length) 
            Row.add(table);
    }

    static add(table, key = null, val = null) {
        var tr = document.createElement('tr');
        var td = Row.createInput(true);
        td.align = 'right';
        td.style.borderLeft = 'none';
        td.removeChild(td.childNodes[0]);
        var image = document.createElement('img');
        image.src = '../img/delete.png';
        image.addEventListener('click', () => { Row.remove(image)}); 
        image.addEventListener('click', () => { Row.pasteParametrs()}); 
        td.appendChild(image);
        tr.appendChild(Row.createInput(false, table.parentElement.parentElement.id, key));
        tr.appendChild(Row.createInput(true, table.parentElement.parentElement.id, val));   
        tr.appendChild(td);
        table.appendChild(tr);
    }

    static remove(el) {
        var row = el.parentElement.parentElement;
        var table = el.parentElement.parentElement.parentElement;
        if (table.rows.length > 1)
            table.removeChild(row);
    }

    static pasteParametrs() {
        var input = document.getElementById('inputRequest');
        var keys = document.getElementsByClassName('parKey');
        var values = document.getElementsByClassName('parVal');
        if (input.value.lastIndexOf('?') != -1)
            input.value = input.value.substr(0, input.value.lastIndexOf('?'));
        input.value += '?';
        for (var i = 0; i < keys.length; i++) {
            if (i == keys.length-1)
                if (keys[i].value=='' && values[i].value=='')
                    break;
            input.value += keys[i].value+'='+values[i].value+'&';
        }
        input.value = input.value.substr(0, input.value.length-1);
    }
    
    static fill(el) {
        var element = JSON.parse(window.localStorage.getItem(el.id));
        document.getElementById('inputRequest').value = element.path;
        document.getElementById('select').value = element.type;
        var parTable = document.getElementById('Parametrs').children[1].children[1];
        var headerTable = document.getElementById('Headers').children[1].children[1];
        var dataTable = document.getElementById('Data').children[1].children[1];
        parTable.innerHTML = null;
        headerTable.innerHTML = null;
        dataTable.innerHTML = null;
        for (var key in element.parametrs) 
            Row.add(parTable, key, element.parametrs[key]);
        Row.add(parTable); 
        for (var key in element.headers) 
            Row.add(headerTable, key, element.headers[key]);
        Row.add(headerTable); 
        for (var key in element.data) 
            Row.add(dataTable, key, element.data[key]);
        Row.add(dataTable);
    }
}

module.exports = Row;