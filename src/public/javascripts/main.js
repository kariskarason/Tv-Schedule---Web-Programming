

document.addEventListener('DOMContentLoaded', function () {
  const pg = require('pg');

  const pgp = require('pg-promise')();

  const path = require('path');

  const xss = require('xss');

  const DATABASE = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost/data';
  const db = pgp(DATABASE);
});

   $(document).ready(function(){
       $("#btn1").click(function(){
           let x = $("#test3").val();
           const comments= db.any(`SELECT * FROM channelsTest WHERE show = $1`, [x]);
           console.log(comments);
           $("#test3").val(comments[1]);
       });


       $("#btn2").click(function(){
         console.log("jabbs");
         $("#test2").html("<b>Hello world!</b>");

       });
       $("#btn3").click(function(){
           $("#test3").val("Dolly Duck");
       });
   });
