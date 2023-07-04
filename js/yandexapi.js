window.addEventListener('DOMContentLoaded', () => {
    ymaps.ready(init);
    let map;
    let higherCollection
    let averageCollection
    let additionalCollection
    let activeBtn;

    async function init() {
        let center = [55.649803162, 37.664463043]
        // Параметры карты можно задать в конструкторе.
        map = await new ymaps.Map(
            'map',
            {
                center: center,
                zoom: 3,
                controls: []
            }, {
                searchControlProvider: 'yandex#search'
            });

        higherCollection = new ymaps.GeoObjectCollection(null, {});
        averageCollection = new ymaps.GeoObjectCollection(null, {});
        additionalCollection = new ymaps.GeoObjectCollection(null, {});

        /*----------------------------------------Высшее образование------------------------------------------------*/
        let higherEducation = [
            {
                title: "СПБПУ",
                desk: "adasasdasd",
                latitude: 55.649803162,
                longitude: 37.664463043
            },
            {
                title: "СПБПУ",
                desk: "adasasdasd",
                latitude: 54.166913202075115,
                longitude: 37.586139122312204
            }
        ];
        higherEduc = () => {
            for (let i = 0; i < higherEducation.length; i++) {
                higherEducation.forEach((item) => {
                    higherCollection.add(new ymaps.Placemark([item.latitude, item.longitude], {
                        hintContent: item.title,
                        balloonContent:
                            `
                             
                               <fieldset>
                                <legend><img src="../img/atlas_legend.png" alt="legend_atlas" size=""></legend>
                                <label>${item.title}</label>
                              </fieldset>
                        `,
                    }, {
                        preset: 'islands#redDotIcon',
                        iconLayout: 'default#imageWithContent',
                        iconImageHref: 'img/red_circle.png',
                        iconImageSize: [20, 20],
                        iconImageOffset: [0, 0],

                    }))
                })

            }
            return higherEducation
        }

        /*----------------------------------------Среднее образование------------------------------------------------*/
        let averageEducation = [
            {
                title: "СПБГУ",
                desk: "adasasdasd",
                latitude: 45.06252622511122,
                longitude: 38.99731322616615
            }, {
                title: "СПБГУ",
                desk: "adasasdasd",
                latitude: 54.90765560419258,
                longitude: 52.274258541957394
            }
        ];
        averEducation = () => {
            for (let i = 0; i < averageEducation.length; i++) {
                averageEducation.forEach((item) => {
                    averageCollection.add(new ymaps.Placemark([item.latitude, item.longitude], {
                        hintContent: item.title,
                        balloonContent:
                            `
                             
                               <fieldset>
                                <legend><img src="../img/atlas_legend.png" alt="legend_atlas" size=""></legend>
                                <label>${item.title}</label>
                              </fieldset>
                        `,

                    }, {
                        preset: 'islands#redDotIcon',
                        iconLayout: 'default#imageWithContent',
                        iconImageHref: 'img/blue-circle.png',
                        iconImageSize: [20, 20],
                        iconImageOffset: [0, 0],
                    }))
                })
            }
            return averEducation
        }

        /*----------------------------------------Дополнителное образование-------------------------------------------*/
        let additionalEducation = [
            {
                title: "ФИНЭК",
                desk: "adasasdasd",
                latitude: 15.06252622511122,
                longitude: 98.99731322616615
            },
            {
                title: "ФИНЭ",
                desk: "adasasdasd",
                latitude: 34.90765560419258,
                longitude: 62.274258541957394
            }
        ]
        addEduc = () => {
            for (let i = 0; i < higherEducation.length; i++) {
                additionalEducation.forEach((item) => {
                    additionalCollection.add(new ymaps.Placemark([item.latitude, item.longitude],
                        {
                            balloonContent:
                                `
                               <fieldset>
                                <legend><img src="../img/atlas_legend.png" alt="legend_atlas" size=""></legend>
                                <label>${item.title}</label>
                              </fieldset>
                        `,
                        }, {
                            preset: 'islands#redDotIcon',
                            iconLayout: 'default#imageWithContent',
                            iconImageHref: 'img/yellow-cirlce.png',
                            iconImageSize: [20, 20],
                            iconImageOffset: [0, 0],
                        }))
                })

            }
        }
        return map
    }

    /*Активность кнопок фильтров*/
    let higherBtn = document.querySelectorAll('.atlas_btn_item')
    higherBtn.forEach((item) => {

        item.addEventListener("click", (ev) => {
            activeBtn = item.id
            console.log(activeBtn)
            if (item.classList.contains('active_btn') && item.id === activeBtn) {
                item.classList.remove('active_btn')
            } else {
                item.classList.add('active_btn')
            }

            if (item.id === 'higher_btn' && item.classList.contains('active_btn')) {
                map.geoObjects.add(higherCollection)
                higherEduc()
            } else if (item.id === 'aver_btn' && item.classList.contains('active_btn')) {
                map.geoObjects.add(averageCollection)
                averEducation()
            } else if (item.id === 'add_btn' && item.classList.contains('active_btn')) {
                map.geoObjects.add(additionalCollection)
                addEduc()
            } else {
                map.geoObjects.remove()
            }
        })
    })
})

/*
map.geoObjects
    .add(higherCollection)
    .add(averageCollection)
    .add(additionalCollection)*/





