console.group("Person");
console.log("Date" , new Date());
console.log("Add" ,(1+2));
console.groupEnd("Person")


var p = { name : "khurram" , age: 39};

console.dir(p,{ colors: true, depth: null});


{/* <video id=v width="320" height="240" controls>
  <source src="movie.mp4" type="video/mp4">
  <source src="movie.ogg" type="video/ogg">
  Your browser does not support the video tag.
</video> */}

// Just imagine that you have the following markup in your html

navigator.mediaDevices.getUserMedia({video:true})
.then(stream => document.getElementById("v").srcObject = stream)
.catch(e => console.log(e));// this will ask user permission for camera once granted then you will be able to see video!