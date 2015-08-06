Meteor.subscribe("resultados1");
Meteor.subscribe("resultados2");

Template.barChart2.rendered = function(arrayConfiguraciones, arrayContenido){
//Template.barChart2.rendered = function(){
  

  var valorDos = {};
  valorDos["year"]=2005;
  valorDos["income"]=23.5;
  valorDos["expenses"]=18.1;
  var valorUno = [
		valorDos,
		{
			"argumento": 2006,
			"income": 26.2,
			"expenses": 22.8,
			"otrovalor": 25
		},
		{
			"argumento": 2007,
			//"income": 30.1,
			"expenses": 23.9,
			"otrovalor": 26
		},
		{
			"argumento": 2008,
			"income": 29.5,
			//"expenses": 25.1,
			"otrovalor": 27
		},
		{
			"argumento": 2009,
			"income": 24.6,
			"expenses": 25,
			"otrovalor": 28
		}
  ];
  var configuraciones = [
		
		{
			"balloonText": "Income:[[value]]",
			"fillAlphas": 0.8,
			"id": "AmGraph-1",
			"lineAlpha": 0.2,
			"title": "Income",
			"type": "column",
			"valueField": "income"
		},
		
		{
			"balloonText": "Expenses:[[value]]",
			"fillAlphas": 0.8,
			"id": "AmGraph-2",
			"lineAlpha": 0.2,
			"title": "Expenses",
			"type": "column",
			"valueField": "expenses"
		},
        {
        	"balloonText": "OtroValor:[[value]]",
        	"fillAlphas": 0.8,
        	"id": "AmGraph-3",
        	"lineAlpha": 0.2,
        	"title": "OtroValor",
        	"type": "column",
        	"valueField": "otrovalor"
        }
	];


  arrayContenido2 = [
   {
    "argumento": "nohe",
    "circle": 10,
    "rect": 2, 
    "triangle": 1
   },
   {
    "argumento": "leonel",
    "circle": 0,
    "rect": 5, 
    "triangle": 2
   },
   {
    "argumento": "carlos",
    "circle": 1,
    "rect": 1, 
    "triangle": 1
   }

  ];

  arrayConfiguraciones2 = [
    {
      "balloonText": "circle:[[value]]",
      "fillAlphas": 0.8,
      "id": "AmGraph-1",
      "lineAlpha": 0.2,
      "title": "Income",
      "type": "column",
      "valueField": "circle"
    },
    {
      "balloonText": "rect:[[value]]",
      "fillAlphas": 0.8,
      "id": "AmGraph-2",
      "lineAlpha": 0.2,
      "title": "Income",
      "type": "column",
      "valueField": "rect"
    },
    {
      "balloonText": "triangle:[[value]]",
      "fillAlphas": 0.8,
      "id": "AmGraph-3",
      "lineAlpha": 0.2,
      "title": "Income",
      "type": "column",
      "valueField": "triangle"
    }
  ];
  
	
  var chart = AmCharts.makeChart("divChart", {
	"type": "serial",
  "theme": "light",
  "addClassNames": true,
	"categoryField": "argumento",
	"rotate": false,
	"startDuration": 1,
	"categoryAxis": {
		"gridPosition": "start",
		"position": "left"
	},
	"trendLines": [],
	"graphs": arrayConfiguraciones,
	"guides": [],
	"valueAxes": [
		{
			"id": "ValueAxis-1",
			"position": "bottom",
			"axisAlpha": 0
		}
	],
	"allLabels": [],
	"balloon": {},
	"titles": [],
	"dataProvider": arrayContenido,
    "export": {
    	"enabled": true
     }

});
}

Template.barChart2.helpers({
  
  traerConsultaUno: function(){
    Meteor.call("removerResultados");
    Meteor.call("actualizarResultados", "hola"); 

  }, 
  
  
})

Template.barChart2.events({
  'click .consultar': function(){
        
    Meteor.call("realizarConsulta", "hola");
    var arregloUno = Resultados1.find({}).fetch();
    var lengthArrayUno = arregloUno.length;
    var arrayValorX = []; 
    var arrayObjetos = []; 
    var arrayConfiguraciones = []; 
    var arrayDefEtiquetas = [];
    var i;    
    
    respuesta = function (val, arr){
      for(m=0; m<arr.length; m++){
        if(arr[m] != val){
          if(m == arr.length - 1){
            return true;
          }
        }
        else
          return false;
      }
    }    

    arrayDefEtiquetas.push(arregloUno[0].arreglo[0]);
    for(i=0; i<lengthArrayUno; i++){
      var lengthArrayDos = arregloUno[i].arreglo.length;
      arrayValorX[i] = arregloUno[i]._id;
      var arrayEtiqInternas = [];
      //OBTIENE EL ARRAY INTERNO
      for(j=0; j<lengthArrayDos; j++){
        arrayEtiqInternas[j] = arregloUno[i].arreglo[j];
        
        if(respuesta(arregloUno[i].arreglo[j], arrayDefEtiquetas)){
           arrayDefEtiquetas.push(arregloUno[i].arreglo[j]);
        }
      }

      var objetico2 = {};
      objetico2["argumento"] = arrayValorX[i];

      //HACE CONTEO DE ARRAY INTERNO
      for(k=0; k<arrayEtiqInternas.length; k++){
        
        
        if(objetico2[arrayEtiqInternas[k]]){
          objetico2[arrayEtiqInternas[k]] = objetico2[arrayEtiqInternas[k]] + 1;  
        }
        else{
          objetico2[arrayEtiqInternas[k]] = 1;  
        }   
      } 

      
      // INSERTA OBJETO DEL CONTEO DEL ARRAY DE OBJETOS
      arrayObjetos.push(objetico2);   
    }
    
    console.log(arrayDefEtiquetas);
    console.log(arrayValorX);

    
    var diseño = {}; 
      for(l=0; l<arrayDefEtiquetas.length; l++){
  	    //arrayArray[l] = ''.concat(arrayArray[i], ':[[value]]');
        var index = l+1;
  	    diseño = 
        {
	       "balloonText": ''.concat(arrayDefEtiquetas[l], ':[[value]]'),
		     "fillAlphas": 0.8,
		     //"id": "AmGraph-1",
         "id": ''.concat("AmGraph-", index),
		     "lineAlpha": 0.2,
		     "title": "Income",
		     "type": "column",
		     "valueField": arrayDefEtiquetas[l]
	    };
	   
	    arrayConfiguraciones.push(diseño);
      }

      console.log(arrayObjetos);
      console.log(arrayConfiguraciones);
      

    Template.barChart2.rendered(arrayConfiguraciones, arrayObjetos);
  },

  'click .remover': function(){
    Meteor.call("removerResultados");
  }
})

 