var calculator = {
    //init variables
    view: document.getElementById("display"),
    ViewValue: "0",
    operation: "",
    num1: 0,
    num2: 0,
    ultimoValor: 0,
    result: 0,
    auxKey: false,

    // inicialization function
    init: (function () {
        this.pressKey(".tecla");
        this.allEvents();
    }),

    //Add value to numbers and operators
    allEvents: function () {
        document.getElementById("0").addEventListener("click", function () { calculator.addNumber("0"); });
        document.getElementById("1").addEventListener("click", function () { calculator.addNumber("1"); });
        document.getElementById("2").addEventListener("click", function () { calculator.addNumber("2"); });
        document.getElementById("3").addEventListener("click", function () { calculator.addNumber("3"); });
        document.getElementById("4").addEventListener("click", function () { calculator.addNumber("4"); });
        document.getElementById("5").addEventListener("click", function () { calculator.addNumber("5"); });
        document.getElementById("6").addEventListener("click", function () { calculator.addNumber("6"); });
        document.getElementById("7").addEventListener("click", function () { calculator.addNumber("7"); });
        document.getElementById("8").addEventListener("click", function () { calculator.addNumber("8"); });
        document.getElementById("9").addEventListener("click", function () { calculator.addNumber("9"); });
        document.getElementById("on").addEventListener("click", function () { calculator.clearView(); });
        document.getElementById("sign").addEventListener("click", function () { calculator.changeOperator(); });
        document.getElementById("punto").addEventListener("click", function () { calculator.addDecimal(); });
        document.getElementById("igual").addEventListener("click", function () { calculator.seeResult(); });
        document.getElementById("dividido").addEventListener("click", function () { calculator.addOperation("/"); });
        document.getElementById("por").addEventListener("click", function () { calculator.addOperation("*"); });
        document.getElementById("menos").addEventListener("click", function () { calculator.addOperation("-"); });
        document.getElementById("mas").addEventListener("click", function () { calculator.addOperation("+"); });
    },

    // Add event to buttons
    pressKey: function (selector) {
        var x = document.querySelectorAll(selector);
        for (var i = 0; i < x.length; i++) {
            x[i].onmouseover = this.keyDown;
            x[i].onmouseleave = this.keyUp;
        };
    },

    keyDown: function (event) {
        calculator.buttonSmall(event.target);
    },

    keyUp: function (event) {
        calculator.buttonBig(event.target);
    },

    //make buttons work according to event

    buttonSmall: function (e) {
        var x = e.id;
        if (x == "1" || x == "2" || x == "3" || x == "0" || x == "igual" || x == "punto") {
            e.style.width = "28%";
            e.style.height = "62px";
        } else if (x == "mas") {
            e.style.width = "88%";
            e.style.height = "98%";
        } else {
            e.style.width = "21%";
            e.style.height = "62px";
        }
    },

    buttonBig: function (e) {
        var x = e.id;
        if (x == "1" || x == "2" || x == "3" || x == "0" || x == "igual" || x == "punto") {
            e.style.width = "29%";
            e.style.height = "62.91px";
        } else if (x == "mas") {
            e.style.width = "90%";
            e.style.height = "100%";
        } else {
            e.style.width = "22%";
            e.style.height = "62.91px";
        }
    },


    clearView: function () {

        this.ViewValue = "0";
        this.operation = "";
        this.num1 = 0;
        this.num2 = 0;
        this.result = 0;
        this.Operacion = "";
        this.auxKey = false;
        this.ultimoValor = 0;
        this.updateVisor();
    },

    changeOperator: function () {
        if (this.ViewValue != "0") {
            var aux;
            if (this.ViewValue.charAt(0) == "-") {
                aux = this.ViewValue.slice(1);
            } else {
                aux = "-" + this.ViewValue;
            }
            this.ViewValue = "";
            this.ViewValue = aux;
            this.updateVisor();
        }
    },

    addDecimal: function () {
        if (this.ViewValue.indexOf(".") == -1) {
            if (this.ViewValue == "") {
                this.ViewValue = this.ViewValue + "0.";
            } else {
                this.ViewValue = this.ViewValue + ".";
            }
            this.updateVisor();
        }
    },

    addNumber: function (valor) {
        if (this.ViewValue.length < 8) {

            if (this.ViewValue == "0") {
                this.ViewValue = "";
                this.ViewValue = this.ViewValue + valor;
            } else {
                this.ViewValue = this.ViewValue + valor;
            }
            this.updateVisor();
        }
    },

    addOperation: function (o) {
        this.num1 = parseFloat(this.ViewValue);
        this.ViewValue = "";
        this.operation = o;
        this.auxKey = false;
        this.updateVisor();
    },

    seeResult: function () { // equals

        if (!this.auxKey) {
            this.num2 = parseFloat(this.ViewValue);
            this.ultimoValor = this.num2;

            //Solve result
            this.makeOperation(this.num1, this.num2, this.operation);

        } else {
            //calc result
            this.makeOperation(this.num1, this.ultimoValor, this.operation);
        }

        //save result
        this.num1 = this.result;

        //clear view and result
        this.ViewValue = "";

        //check result length

        if (this.result.toString().length < 9) {
            this.ViewValue = this.result.toString();
        } else {
            this.ViewValue = this.result.toString().slice(0, 8) + "...";
        }

        //result for last value

        this.auxKey = true;
        this.updateVisor();

    },

    makeOperation: function (num1, num2, operation) {
        switch (operation) {
            case "+":
                this.result = eval(num1 + num2);
                break;
            case "-":
                this.result = eval(num1 - num2);
                break;
            case "*":
                this.result = eval(num1 * num2);
                break;
            case "/":
                this.result = eval(num1 / num2);
                break;
            case "raiz":
                this.result = eval(Math.sqrt(num1));
        }
    },

    updateVisor: function () {
        this.view.innerHTML = this.ViewValue;
    }

};

calculator.init();
