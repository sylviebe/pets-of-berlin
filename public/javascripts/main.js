var map;
const markers = [];

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

    //MARKERS

    // setTimeout(function() {
    // getPets();
    // }, 1000);

    const myMarker = new google.maps.Marker({
        position: {
            lat: 30,
            lng: 40
        },
        map: map,
        title: "I'm here",
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
        const pin = new google.maps.Marker({
            position: el.location,
            map: map,
            title: el.name,
            icon: './images/guinea-icon.png'
        });
        markers.push(pin);
    });
};

getPets();
