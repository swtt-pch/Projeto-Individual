var ax_tipo = []
var ax_qtd = [];
var ctx = document.getElementById("myChart").getContext("2d");

function iniciarGrafico() {
    fetch('/dashboard/maisIndicados')
        .then(function (resposta) {
            resposta.json()
                .then(json => {
                    for (let i = 0; i < json.length; i++) {
                        ax_tipo.push(json[i].tipo);
                        ax_qtd.push(json[i].qtd);
                    }

                    const data = {
                        labels: ax_tipo,
                        datasets: [{
                            label: 'My First Dataset',
                            data: ax_qtd,
                            backgroundColor: [
                                '#FFBB30',
                                '#FF8E3C',
                                '#FF4A30',
                                '#80471F'
                            ],
                            hoverOffset: 4
                        }]
                    };

                    const config = {
                        type: 'pie',
                        data: data,
                    };
                    const myChart = new Chart(
                        document.getElementById('myChart'),
                        config
                    );
                })
        });
}

function iniciarLikes() {
    fetch(`/dashboard/qtdCurtidas/${sessionStorage.ID_USUARIO}`)
        .then(resposta =>{
            resposta.json()
                .then(json =>{
                    document.getElementById('likes').innerHTML = json.qtd
                })
        })
}

function iniciarComents() {
    fetch(`/dashboard/qtdComentarios/${sessionStorage.ID_USUARIO}`)
        .then(resposta =>{
            resposta.json()
                .then(json =>{
                    document.getElementById('coments').innerHTML = json.qtd
                })
        })
}

function iniciarIndications() {
    fetch(`/dashboard/qtdIndicacoes/${sessionStorage.ID_USUARIO}`)
    .then(resposta =>{
        resposta.json()
            .then(json =>{
                document.getElementById('indications').innerHTML = json.qtd
            })
    })
}