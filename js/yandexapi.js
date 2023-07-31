window.addEventListener('DOMContentLoaded', () => {
    ymaps.ready(init);
    let map;

    //Коллекции
    let averageCollection
    let additionalCollection
    let higherCollection
    //массивы
    let higherEducation
    let averageEducation
    let additionalEducation
    let sortCollection
    let sortArray
    let activeBtn;

    async function init() {
        let center = [61.782062911598075, 85.32215890189144]
        map = await new ymaps.Map(
            'map',
            {
                center: center,
                zoom: 3,
                controls: [],
                behaviors: ['default', 'scrollZoom']
            }, {
                searchControlProvider: 'yandex#search'
            });

        map.controls.remove('searchControl')
        map.controls.remove('trafficControl');
        higherCollection = new ymaps.GeoObjectCollection(null, {});
        averageCollection = new ymaps.GeoObjectCollection(null, {});
        additionalCollection = new ymaps.GeoObjectCollection(null, {});
        sortCollection = new ymaps.GeoObjectCollection(null, {})
        filteredCollection = new ymaps.GeoObjectCollection(null, {})
        filteredArray = []

        filtered = () => {
            for (let i = 0; i < filteredArray.length; i++) {
                filteredArray.forEach((item) => {
                    let myPlacemark = new ymaps.Placemark([item.latitude, item.longitude], {
                        hintContent: item.title,
                        balloonContent: item.title,
                    }, {
                        balloonShadow: false,
                        balloonLayout: MyBalloonLayout,
                        iconLayout: 'default#imageWithContent',
                        iconImageHref: 'img/red_circle.png',
                        iconImageSize: [20, 20],
                        iconImageOffset: [0, 0],
                    })
                    filteredCollection.add(myPlacemark)
                    myPlacemark.events
                        .add('click', (e) => {
                            console.log(myPlacemark.options)
                            myPlacemark.options.set('iconImageHref', 'img/red_circle.png')
                            e.get('target').options.set('iconImageHref', 'img/activeMark.png');
                            atlasWindow.style.display = 'flex'
                            document.querySelector(".modal-city").textContent = `г. ${item.city}`
                            document.querySelector(".modal-title").textContent = item.title
                            document.querySelector(".direction").textContent = item.direction
                            document.querySelector(".format").textContent = item.format
                            document.querySelector(".description").textContent = item.description
                            document.querySelector(".citizen").href = item.citizen
                        })
                })
            }
            return filteredArray
        }

        MyBalloonLayout = ymaps.templateLayoutFactory.createClass(
            '<div class="atlas_modal_box">' +
            '<img src="./img/atlas_legend.png" class="atlas_modal_img">' +
            '<p class="atlas_modal_text">' + '$[[options.contentLayout minWidth=650]]' +
            '</p>' +
            ' </div>'
            , {
                build: function () {
                    this.constructor.superclass.build.call(this);
                    this._element = document.querySelector('.atlas_modal_box').parentElement
                    this.applyElementOffset();
                    this.events.fire('shapechange');
                },
                applyElementOffset: function () {
                    document.querySelector('.atlas_modal_box').style.top = (-80 + 'px')
                    document.querySelector('.atlas_modal_box').style.left = (30 + 'px')
                },

            }),


            /*----------------------------------------Высшее образование------------------------------------------------*/
            higherEducation = [
                {
                    title: "ФГАОУ ВО «Национальный исследовательский ядерный университет «МИФИ»",
                    city: 'Москва',
                    subtitle: "Федеральное государственное автономное образовательное учреждение высшего образования «Национальный исследовательский ядерный университет «МИФИ»",
                    direction: "15.03.06 – Мехатроника и робототехника",
                    description: "Осуществляется практическая подготовка бакалавров, способных успешно работать в сфере деятельности, связанной с разработкой и сопровождением эксплуатации мехатронных, киберфизических и робототехнических систем в атомной промышленности и других высокотехнологичных отраслях.",
                    format: "бакалавриат - 4 года",
                    citizen: 'https://eng.mephi.ru/academics/admissions',
                    latitude: 50.582061,
                    longitude: 36.596484,
                    rang: 'high'
                    ,
                },

                {
                    title: "ФГАОУ ВО «Белгородский государственный технологический университет им. В.Г. Шухова»",
                    city: 'Белгород',
                    subtitle: "Федеральное государственное автономное образовательное учреждение высшего образования «Национальный исследовательский ядерный университет «МИФИ»",
                    direction: "15.03.06 – Мехатроника и робототехника",
                    description: "Область профессиональной деятельности выпускников, освоивших программу: цифровые методы и средства проектирования, математического, физического и компьютерного моделирования технологических процессов. Выпускники разрабатывают инновационные технологии и их цифровые двойники для самых перспективных отраслей промышленности – автомобиле-, авиа-, ракетостроения, энергетики и атомной промышленности и эффективно их внедряют на производстве.",
                    format: "бакалавриат - 4 года",
                    citizen: 'https://eng.mephi.ru/academics/admissions',
                    latitude: 55.649803162,
                    longitude: 37.664463043,
                    rang: 'high'
                }

            ];
        higherEduc = () => {
            for (let i = 0; i < higherEducation.length; i++) {
                higherEducation.forEach((item) => {
                    let myPlacemark = new ymaps.Placemark([item.latitude, item.longitude], {
                        hintContent: item.title,
                        balloonContent: item.title,
                    }, {
                        balloonShadow: false,
                        balloonLayout: MyBalloonLayout,
                        iconLayout: 'default#imageWithContent',
                        iconImageHref: 'img/red_circle.png',
                        iconImageSize: [20, 20],
                        iconImageOffset: [0, 0],
                    })
                    higherCollection.add(myPlacemark)
                    myPlacemark.events
                        .add('click', (e) => {
                            console.log(myPlacemark.options)
                            myPlacemark.options.set('iconImageHref', 'img/red_circle.png')
                            e.get('target').options.set('iconImageHref', 'img/activeMark.png');
                            atlasWindow.style.display = 'flex'
                            document.querySelector(".modal-city").textContent = `г. ${item.city}`
                            document.querySelector(".modal-title").textContent = item.title
                            document.querySelector(".direction").textContent = item.direction
                            document.querySelector(".format").textContent = item.format
                            document.querySelector(".description").textContent = item.description
                            document.querySelector(".citizen").href = item.citizen
                        })
                })
            }
            return higherEducation
        }

        /*----------------------------------------Среднее образование------------------------------------------------*/
        averageEducation = [
            {
                title: "СПБГУ",
                desk: "aa",
                latitude: 45.06252622511122,
                longitude: 38.99731322616615,
                rang: 'aver'
            }, {
                title: "СПБГУ",
                desk: "aaa",
                latitude: 54.90765560419258,
                longitude: 52.274258541957394,
                rang: 'aver'
            }
        ];
        averEducation = () => {
            for (let i = 0; i < averageEducation.length; i++) {
                averageEducation.forEach((item) => {
                    let myPlacemark = new ymaps.Placemark([item.latitude, item.longitude], {
                        hintContent: item.title,
                        balloonContent: item.desk,
                    }, {
                        balloonShadow: false,
                        balloonLayout: MyBalloonLayout,
                        iconLayout: 'default#imageWithContent',
                        iconImageHref: 'img/blue-circle.png',
                        iconImageSize: [20, 20],
                        iconImageOffset: [0, 0],
                    })
                    averageCollection.add(myPlacemark)
                    myPlacemark.events.add('click', () => {
                        atlasWindow.style.display = 'flex'
                        document.querySelector(".modal-city").innerText = `г. ${item.city}`
                    })
                })
            }
            return averEducation
        }

        /*----------------------------------------Дополнителное образование-------------------------------------------*/
        additionalEducation = [
            {
                title: "ФИНЭК",
                desk: "adasasdasd",
                latitude: 15.06252622511122,
                longitude: 98.99731322616615,
                rang: 'add'
            },
            {
                title: "ФИНЭ",
                desk: "adasasdasd",
                latitude: 34.90765560419258,
                longitude: 62.274258541957394,
                rang: 'add'
            }
        ]
        addEduc = () => {
            for (let i = 0; i < higherEducation.length; i++) {
                additionalEducation.forEach((item) => {
                    let myPlacemark = new ymaps.Placemark([item.latitude, item.longitude],
                        {
                            hintContent: item.title,
                            balloonContent: item.title
                        },
                        {
                            balloonShadow: false,
                            balloonLayout: MyBalloonLayout,
                            iconLayout: 'default#imageWithContent',
                            iconImageHref: 'img/yellow-cirlce.png',
                            iconImageSize: [20, 20],
                            iconImageOffset: [0, 0],
                        })
                    additionalCollection.add(myPlacemark)
                    myPlacemark.events.add('click', () => {
                        atlasWindow.style.display = 'flex'
                        document.querySelector(".modal-city").innerText = item.city
                    })
                })
            }
        }
        let ZoomLayout = ymaps.templateLayoutFactory.createClass("" +
                "<div class='atlas_zoom'>" +
                "<div id='zoom-in'><img src='../img/atlas_plus.svg' alt=''></div><br>" +
                "<div id='zoom-out'><img src='../img/atlas_minus.svg' alt='minus'></div>" +
                "</div>", {

                // Переопределяем методы макета, чтобы выполнять дополнительные действия
                // при построении и очистке макета.
                build: function () {
                    // Вызываем родительский метод build.
                    ZoomLayout.superclass.build.call(this);

                    // Привязываем функции-обработчики к контексту и сохраняем ссылки
                    // на них, чтобы потом отписаться от событий.
                    this.zoomInCallback = ymaps.util.bind(this.zoomIn, this);
                    this.zoomOutCallback = ymaps.util.bind(this.zoomOut, this);

                    // Начинаем слушать клики на кнопках макета.
                    $('#zoom-in').bind('click', this.zoomInCallback);
                    $('#zoom-out').bind('click', this.zoomOutCallback);
                },

                clear: function () {
                    // Снимаем обработчики кликов.
                    $('#zoom-in').unbind('click', this.zoomInCallback);
                    $('#zoom-out').unbind('click', this.zoomOutCallback);

                    // Вызываем родительский метод clear.
                    ZoomLayout.superclass.clear.call(this);
                },

                zoomIn: function () {
                    let map = this.getData().control.getMap();
                    map.setZoom(map.getZoom() + 1, {checkZoomRange: true});
                },

                zoomOut: function () {
                    let map = this.getData().control.getMap();
                    map.setZoom(map.getZoom() - 1, {checkZoomRange: true});
                }
            }),
            zoomControl = new ymaps.control.ZoomControl({options: {layout: ZoomLayout}});

        map.controls
            .add('typeSelector', {
                float: 'none',
                position: {
                    right: 40,
                    top: 30
                }
            })
            .add(zoomControl)
            .add("geolocationControl", {
                float: 'right',
                position: {
                    right: 50,
                    top: 200
                }
            })
        map.geoObjects
            .add(higherCollection)
            .add(averageCollection)
            .add(additionalCollection)
        higherEduc()
        averEducation()
        addEduc()
        return map
    }

    /*Активность кнопок фильтров*/
    let atlasWindow = document.querySelector('.atlas_modal')
    let higherBtn = document.querySelectorAll('.atlas_btn_item')
    higherBtn.forEach((item) => {
        item.addEventListener("click", (ev) => {
            const object = map.geoObjects.getLength()
            if (item.classList.contains('active_btn')) {
                item.classList.remove('active_btn')
                if (item.id === 'higherCollection') {
                    filteredArray.forEach((item) => {
                        let arr = [item.latitude, item.longitude]
                        if (item.rang === "high") {
                            filteredCollection.each((coordnates)=>{
                                if(coordnates.geometry._coordinates == arr){
                                    console.log(coordnates.geometry._coordinates)
                                    console.log('ok')
                                    filteredCollection.remove(item)
                                }else {
                                }

                            })
                        }
                    })

                } else if (item.id === 'averageCollection') {
                    map.geoObjects.remove(averageCollection)
                } else {
                    map.geoObjects.remove(additionalCollection)
                }
            } else {
                item.classList.add('active_btn')
            }

            if (object !== 0) {
                map.geoObjects.remove(higherCollection)
                map.geoObjects.remove(averageCollection)
                map.geoObjects.remove(additionalCollection)
                if (item.id === 'higherCollection' && item.classList.contains('active_btn')) {
                    higherEducation.forEach((item) => filteredArray.push(item))
                    map.geoObjects.add(filteredCollection)
                    filtered()
                } else if (item.id === 'averageCollection' && item.classList.contains('active_btn')) {
                    averageEducation.forEach((item) => filteredArray.push(item))
                    map.geoObjects.add(filteredCollection)
                    filtered()
                } else if (item.id === 'additionalCollection' && item.classList.contains('active_btn')) {
                    additionalEducation.forEach((item) => filteredArray.push(item))
                    map.geoObjects.add(filteredCollection)
                    filtered()
                } else {
                    map.geoObjects.remove()
                }
            } else {
                map.geoObjects.remove(filteredCollection)
                map.geoObjects
                    .add(higherCollection)
                    .add(averageCollection)
                    .add(additionalCollection)
            }


        })
    })
})






