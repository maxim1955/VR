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
    let activeBtn = true
    let checkActiveBtn
    let vr_btn = document.querySelector('#vr_btn')
    let ar_btn = document.querySelector("#ar_btn")
    let ronotBtn = document.querySelector('#robot_btn')
    let deleteArr = []

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
                    rang: 'vr',
                    type: 'high'
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
                    rang: 'ar',
                    type: 'high'
                },
                {
                    title: "ФГАОУ ВО «Белгородский государственный технологический университет им. В.Г. Шухова»",
                    city: 'Белгород',
                    subtitle: "Федеральное государственное автономное образовательное учреждение высшего образования «Национальный исследовательский ядерный университет «МИФИ»",
                    direction: "15.03.06 – Мехатроника и робототехника",
                    description: "Область профессиональной деятельности выпускников, освоивших программу: цифровые методы и средства проектирования, математического, физического и компьютерного моделирования технологических процессов. Выпускники разрабатывают инновационные технологии и их цифровые двойники для самых перспективных отраслей промышленности – автомобиле-, авиа-, ракетостроения, энергетики и атомной промышленности и эффективно их внедряют на производстве.",
                    format: "бакалавриат - 4 года",
                    citizen: 'https://eng.mephi.ru/academics/admissions',
                    latitude: 15.649803162,
                    longitude: 57.664463043,
                    rang: 'robot',
                    type: 'high'
                }

            ];
        higherEduc = () => {
            for (let i = 0; i < higherEducation.length; i++) {
                higherEducation.forEach((item) => {
                    let myPlacemark = new ymaps.Placemark([item.latitude, item.longitude], {
                        hintContent: item.title,
                        balloonContent: item.title,
                        item,
                    }, {
                        balloonShadow: false,
                        balloonLayout: MyBalloonLayout,
                        iconLayout: 'default#imageWithContent',
                        iconImageHref: 'img/red_circle.png',
                        iconImageSize: [20, 20],
                        iconImageOffset: [0, 0],

                    })
                    higherCollection.add(myPlacemark, item.rang)
                    myPlacemark.events
                        .add('click', (e) => {
                            e.get('target').options.set('iconImageHref', 'img/activeMark.png');
                            atlasWindow.style.display = 'flex'
                            document.querySelector(".modal-city").textContent = `г. ${item.city}`
                            document.querySelector(".modal-title").textContent = item.title
                            document.querySelector(".direction").textContent = item.direction
                            document.querySelector(".format").textContent = item.format
                            document.querySelector(".description").textContent = item.description
                            document.querySelector(".citizen").href = item.citizen
                        })
                        .add('mouseenter', function (e) {
                            e.get('target').options.set('iconImageHref', 'img/activeMark.png');
                        })
                        .add('mouseleave', function (e) {
                            e.get('target').options.set('iconImageHref', 'img/red_circle.png')
                        });
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
                rang: 'vr',
                type: 'aver'
            },
            {
                title: "СПБГУ",
                desk: "aa",
                latitude: 48.06252622511122,
                longitude: 33.99731322616615,
                rang: 'robot',
                type: 'aver'
            },

            {
                title: "СПБГУ",
                desk: "aaa",
                latitude: 54.90765560419258,
                longitude: 52.274258541957394,
                rang: 'ar',
                type: 'aver'
            }
        ];
        averEducation = () => {
            for (let i = 0; i < averageEducation.length; i++) {
                averageEducation.forEach((item) => {
                    let myPlacemark = new ymaps.Placemark([item.latitude, item.longitude], {
                        hintContent: item.title,
                        balloonContent: item.desk,
                        item,
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
                rang: 'vr',
                type: 'add'
            },
            {
                title: "ФИНЭ",
                desk: "adasasdasd",
                latitude: 34.90765560419258,
                longitude: 62.274258541957394,
                rang: 'ar',
                type: 'add'
            },
            {
                title: "ФИНЭ",
                desk: "adasasdasd",
                latitude: 36.90765560419258,
                longitude: 64.274258541957394,
                rang: 'robot',
                type: 'add'
            },
        ]
        addEduc = () => {
            for (let i = 0; i < higherEducation.length; i++) {
                additionalEducation.forEach((item) => {
                    let myPlacemark = new ymaps.Placemark([item.latitude, item.longitude],
                        {
                            hintContent: item.title,
                            balloonContent: item.title,
                            item,
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

                build: function () {
                    ZoomLayout.superclass.build.call(this);
                    this.zoomInCallback = ymaps.util.bind(this.zoomIn, this);
                    this.zoomOutCallback = ymaps.util.bind(this.zoomOut, this);

                    $('#zoom-in').bind('click', this.zoomInCallback);
                    $('#zoom-out').bind('click', this.zoomOutCallback);
                },

                clear: function () {
                    $('#zoom-in').unbind('click', this.zoomInCallback);
                    $('#zoom-out').unbind('click', this.zoomOutCallback);

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


        checkActiveBtn = () => {
            if (!map.geoObjects.getLength()) {
                activeBtn = true
                map.geoObjects
                    .add(higherCollection)
                    .add(averageCollection)
                    .add(additionalCollection)
                higherEduc()
                addEduc()
                averEducation()
                vr_btn.classList.remove('active_btn')
                ar_btn.classList.remove('active_btn')
                ronotBtn.classList.remove('active_btn')
            } else {
                if (activeBtn) {
                    map.geoObjects.removeAll()
                }
            }
        }
        checkActiveBtn()
        return map
    }


    /*Активность кнопок фильтров*/

    let atlasWindow = document.querySelector('.atlas_modal')
    let higherBtn = document.querySelectorAll('.atlas_btn_item')
    let higheduc = document.querySelector('#higherCollection')
    let additional = document.querySelector('#additionalCollection')
    let average = document.querySelector('#averageCollection')
    higherBtn.forEach((item) => {
        console.log(item)
        item.addEventListener("click", (ev) => {
            if (activeBtn) {
                map.geoObjects.removeAll()
                activeBtn = false
            }
            if (item.classList.contains('active_btn')) {
                item.classList.remove('active_btn')
                if (item.id === 'higherCollection') {
                    map.geoObjects.remove(higherCollection)
                    checkActiveBtn()
                } else if (item.id === 'averageCollection') {
                    map.geoObjects.remove(averageCollection)
                    checkActiveBtn()
                } else {
                    map.geoObjects.remove(additionalCollection)
                    checkActiveBtn()
                }

                /*-----------------------------Фильтрация по VR------------------------------------------------------*/

                if (!vr_btn.classList.contains('active_btn') && higheduc.classList.contains('active_btn')) {
                    console.log(deleteArr.length)
                    deleteArr.forEach((item) => {
                        console.log(item)
                        higherCollection.add(item)
                        higherCollection.set(higherCollection.length(), item)
                        map.geoObjects.add(higherCollection)
                    })
                }


            } else {
                item.classList.add('active_btn')
            }
            if (item.id === 'higherCollection' && item.classList.contains('active_btn')) {
                map.geoObjects.add(higherCollection)
                higherEduc()
            }
            if (item.id === 'averageCollection' && item.classList.contains('active_btn')) {
                map.geoObjects.add(averageCollection)
                averEducation()
            }
            if (item.id === 'additionalCollection' && item.classList.contains('active_btn')) {
                map.geoObjects.add(additionalCollection)
                addEduc()
            }
            if (item.id === 'higherCollection' && item.classList.contains('active_btn') && item.id) {
                map.geoObjects.add(higherCollection)
                higherEduc()
            }

            /*-----------------------------Фильтрация по VR------------------------------------------------------*/

            if (item.id === 'vr_btn' && higheduc.classList.contains('active_btn')) {
                for (let i = 0; i < higherCollection.getLength(); i++) {
                    higherCollection.each((item) => {
                        if (item.properties._data.item.rang !== "vr") {
                            console.log(item)
                            higherCollection.remove(item)
                            deleteArr.push(item)
                            console.log(deleteArr.length)
                        }
                    }, {})
                }

            }
            if (item.id === 'vr_btn' && average.classList.contains('active_btn')) {
                for (let i = 0; i < averageCollection.getLength(); i++) {
                    averageCollection.each((item) => {
                        if (item.properties._data.item.rang !== "vr") {
                            averageCollection.remove(item)
                        }
                    })
                }
            }
            if (item.id === 'vr_btn' && additional.classList.contains('active_btn')) {
                for (let i = 0; i < additionalCollection.getLength(); i++) {
                    additionalCollection.each((item) => {
                        if (item.properties._data.item.rang !== "vr") {
                            additionalCollection.remove(item)
                        }
                    })
                }

            }

            /*-----------------------------Фильтрация по AR------------------------------------------------------*/

            if (item.id === 'ar_btn' && higheduc.classList.contains('active_btn')) {
                for (let i = 0; i < higherCollection.getLength(); i++) {
                    higherCollection.each((item) => {
                        if (item.properties._data.item.rang !== "ar") {
                            higherCollection.remove(item)
                        }
                    })
                }
            }
            if (item.id === 'ar_btn' && average.classList.contains('active_btn')) {
                for (let i = 0; i < averageCollection.getLength(); i++) {
                    averageCollection.each((item) => {
                        if (item.properties._data.item.rang !== "ar") {
                            averageCollection.remove(item)
                        } else {
                        }
                    })
                }

            }
            if (item.id === 'ar_btn' && additional.classList.contains('active_btn')) {
                for (let i = 0; i < additionalCollection.getLength(); i++) {
                    additionalCollection.each((item) => {
                        if (item.properties._data.item.rang !== "ar") {
                            additionalCollection.remove(item)
                        } else {
                        }
                    })
                }

            }

            /*-----------------------------Фильтрация по Roboto------------------------------------------------------*/

            if (item.id === 'robot_btn' && higheduc.classList.contains('active_btn')) {
                for (let i = 0; i < higherCollection.getLength(); i++) {
                    higherCollection.each((item) => {
                        if (item.properties._data.item.rang !== "robot") {
                            higherCollection.remove(item)
                        } else {

                        }
                    })
                }

            }
            if (item.id === 'robot_btn' && average.classList.contains('active_btn')) {
                for (let i = 0; i < averageCollection.getLength(); i++) {
                    averageCollection.each((item) => {
                        if (item.properties._data.item.rang !== "robot") {
                            averageCogillection.remove(item)
                        } else {
                        }
                    })
                }

            }
            if (item.id === 'robot_btn' && additional.classList.contains('active_btn')) {
                for (let i = 0; i < additionalCollection.getLength(); i++) {
                    additionalCollection.each((item) => {
                        if (item.properties._data.item.rang !== "robot") {
                            additionalCollection.remove(item)
                        } else {

                        }
                    })
                }

            }
        })

    })
})






