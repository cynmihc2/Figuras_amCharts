Meteor.methods({
  realizarConsulta: function(valor){
    var consulta = [{$group: {_id: "$obj_type", arreglo: {$push: "$username" }}}];
    var consultaDos = [{$group: {_id: "$username", arreglo: {$push: "$obj_type"}}}];
    
    var resultadoUno = Figuras.aggregate(consulta);
    var resultadoDos = Figuras.aggregate(consultaDos);
    console.log("Laura Herrera Correa");
    console.log(resultadoDos);
    
    
    //for(i=0; i<resultadoDos.length; i++){
    for(i=0; i<resultadoUno.length; i++){
      Resultados1.insert(resultadoUno[i]);
      //Resultados2.insert(resultadoDos[i]);
      //console.log("resultadoDos: "+resultadoDos[i]);
      console.log("inserta algo");
    }

  },

  actualizarConsulta: function(valor){
    
  }, 
  removerResultados: function(){
    Resultados1.remove({});
    console.log("Entra a Resultados1");
  }

});