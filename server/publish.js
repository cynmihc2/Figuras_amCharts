Meteor.publish("barras", function(){
    return Bars.find({});
});

Meteor.publish("slices", function(){
    return Slices.find();
});

Meteor.publish("figuras", function(){
    return Figuras.find({
      $or:  [
        {private: {$ne: true} },
        {owner: this.userId}
      ]
    });
});

Meteor.publish("resultados1", function(){
	return Resultados1.find({});
});

Meteor.publish("resultados2", function(){
	return Resultados2.find({});
});

Meteor.publish("resultados", function(){
  return Resultados.find({});
});


//Users NO FUNCIONA
/*
Meteor.publish("users", function(){
  return Usuarios.find({});
});
*/

