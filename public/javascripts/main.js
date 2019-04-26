var map;
const markers = [];

// const geocoder = new google.maps.Geocoder()

// geocoder.geocode({
//     address: 'WeWork, Eichhornstraße, Berlin',
// }).then(data => {
//     console.log('hereeeeeeeeeeeeeeeeeeeeeeeeeee')
//     console.log(data)
// })

function startMap() {
    const kottiBRLN = {
        lat: 52.497992,
        lng: 13.420135
    };
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: kottiBRLN,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    //INFORMATION BOX
    // const contentString = <div id="content" />;
    //  var infowindow = new google.maps.InfoWindow({
    //content: contentString
    /*var infowindow = new google.maps.InfoWindow({
        content: contentString
      });

      var marker = new google.maps.Marker({
        position: uluru,
        map: map,
        title: 'Uluru (Ayers Rock)'
      });
      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });*/

    //MARKERS

    // setTimeout(function() {
    // getPets();
    // }, 1000);

    const myMarker = new google.maps.Marker({
        position: {
            lat: 52.497992,
            lng: 13.420135
        },
        map: map,
        title: "Derek",
        age: "20",
        icon: './images/guinea-icon.png'
    });
}

const getPets = () => {
    axios
        .get('/api/pets')
        .then(response => {
            //console.log('response frontend: ', response.data);
            console.log('start map');
            startMap();
            let data = response.data;
            console.log(data, 'data');
            placePets(data);
        })
        .catch(error => {
            console.log(error);
        });
};



const placePets = pets => {
    console.log('hello from placing pets', pets);
    console.log(pets);
    pets.forEach(function (el) {
        let information = `This is ${el.name}. ${el.name} is ${el.age} and belongs to the ${el.animalFamily} family and is a ${el.colour} colour. Click on ${el.name} to connect.`
        console.log(el, "ELEMENTS AAAAHAHHAHAHAHA")
        const pin = new google.maps.Marker({
            position: el.location,
            map: map,
            title: information,
            icon: './images/guinea-icon.png'
        });
        markers.push(pin);
    });
};

getPets();
