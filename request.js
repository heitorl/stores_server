export const buscarLojasPorBairro = async (cidade, bairro) => {
    const apiKey = 'AIzaSyBXwhXGPjo5uBQ3lEBVK3lRre8V7xIz5VE'; 
    console.log("ENT")
    try {
        
        let endereco = `${bairro}, ${cidade}`;
        let geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(endereco)}&key=${apiKey}`;
        let geoResponse = await fetch(geocodingUrl);
        let geoData = await geoResponse.json();


        if (geoData.status === 'OK') {
            let location = geoData.results[0].geometry.location;
            let lat = location.lat;
            let lng = location.lng;

            
            let radius = 4000; // Raio de busca em metros (aqui, 1000 metros)
            let typeOfPlaces = "store"; // Pode ser modificado conforme sua necessidade
            let placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${typeOfPlaces}&key=${apiKey}`;
            let placesResponse = await fetch(placesUrl);
            let placesData = await placesResponse.json();


            console.log(placesData)

            
            if (placesData.status === 'OK') {
                let lojas = [];
                placesData.results.forEach(result => {
                    let nomeLoja = result.name;
                    let telefoneLoja = result.formatted_phone_number || 'Telefone não disponível';
                    lojas.push({ nome: nomeLoja, telefone: telefoneLoja });
                });
                return lojas;
            } else {
                return null; // Não foi possível obter a lista de lojas
            }
        } else {
            return null; // Não foi possível obter as coordenadas geográficas do bairro
        }
    } catch (error) {
        console.error("Ocorreu um erro:", error);
        return null;
    }
}



buscarLojasPorBairro('Rio de janeiro', 'jacarepaguá')