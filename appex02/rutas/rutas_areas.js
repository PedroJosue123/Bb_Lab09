var mongojs = require('mongojs');
var uri = 'mongodb://127.0.0.1:27017/Lab02';
var db = mongojs(uri,["Areas"]);
function areas_listado(req, res) {
    db.Areas.find().sort({nombre:1}, function(err,records)
    {
        if(err){
            console.log('Error al acceder a la base de Datos.');
            return;
        }
        res.render('m_areas_listado',{records: records});
    });
}
function grabar_nuevo(req, res) {
   var xnom = req.body.xnom;
   var xabre = req.body.xabre;
   var xest= req.body.xest;
   db.Areas.find().sort({_id:-1}, function(err,records)
      {
      if(err){
         console.log('Error al acceder a la base de Datos.');
         res.end();
         return;
      }
      var xid = records[0]._id + 1;
      db.Areas.insertOne ({_id:xid, Nombre:xnom, Abreviatura: xabre , Estado : xest}, function(){
         res.redirect('/m_areas_listado');
      })
      });
}
function editar(req, res) {
   var xid = req.params.xid*1;
   db.Areas.find({_id:xid}).sort({_id:1},function(err,records)
   {
      if (err){
      console.log('Error al acceder a la base de Datos.');
      res.end();
      return;
   }
      res.render('m_areas_editar',{area: records[0]});
   });
}

function grabar_editar(req, res) {
   var xid =req.body.xid*1;
   var xnom = req.body.xnom;
   var xabre = req.body.xabre;
   var xest= req.body.xest;
   db.Areas.update({_id:xid}, {$set: {Nombre:xnom, Abreviatura: xabre , Estado : xest}}, function(){
   res.redirect('/m_areas_listado');
   });
   }


module.exports = {
    listado: function(req, res)
     { areas_listado(req, res);
     },
     nuevo: function(req, res) {
      res.render('m_areas_nuevo',{})},

     grabarnuevo: function(req,res){
         grabar_nuevo(req,res)
      },
      editar:function(req,res){
         editar(req,res);
      },
      grabareditar: function (req, res) {
         grabar_editar(req, res);
      },
      eliminar: function(req,res){
         var xid = req.params.xid*1;
         db.Areas.remove({_id:xid},function(){
            res.redirect('/m_areas_listado');
         });
      },
      
       
};
