console.log("Connected");

const URL = "https://pokeapi.co/api/v2/pokemon";

//get request
fetch(URL)
    .then(data => data.json())
    .then(result => {

        for(var i = 0; i < result.results.length; i++){
            const name = result.results[i].name;
            var URL = "https://pokeapi.co/api/v2/pokemon/" + name;
            fetch(URL)
                .then(data2 => data2.json())
                .then(result2 => {
                    console.log(result2.name);
                    const name = result2.name;
                    const image  = result2.sprites.front_default;

                    const actualImage = document.createElement("img");
                    const actualName = document.createElement("h1");
                    const actualDiv = document.createElement("div");
                    actualDiv.classList.add("actualDiv");

                    const areaForAll = document.getElementById("areaForAll");

                    actualImage.src = image;
                    actualName.innerText = name;

                    actualDiv.appendChild(actualName);
                    actualDiv.appendChild(actualImage);
                    actualDiv.onclick = function(){
                        const modalWindow = document.createElement("div");
                        const innerWindow = document.createElement("div");

                        const leftSide = document.createElement("div");
                        const rightSide = document.createElement("div");

                        const info = document.createElement("h1");

                        const abilities = document.createElement("h2");

                        const baseExperience = document.createElement("h2");


                        abilities.innerText = "Abilities: ";
                        abilities.style.textAlign = "center";
                        baseExperience.innerText  = "Base Experience: " + result2.base_experience;
                        baseExperience.style.textAlign = "center";

                        for(var i = 0; i < result2.abilities.length; i++){
                            abilities.innerText = abilities.innerText + result2.abilities[i].ability.name + ", ";
                        }

                        abilities.innerText = abilities.innerText.slice(0, abilities.innerText.length-2);

                        info.innerText = "Statistics";

                        rightSide.appendChild(info);
                        rightSide.appendChild(abilities);
                        rightSide.appendChild(baseExperience);

                        leftSide.classList.add("leftSide");
                        rightSide.classList.add("rightSide");

                        innerWindow.classList.add("innerWindow");
                        modalWindow.classList.add("modalWindow");
                        areaForAll.appendChild(modalWindow);
                        modalWindow.appendChild(innerWindow);

                        var newImage = actualImage.cloneNode(true);
                        
                        newImage.style.width = '250px';

                        leftSide.appendChild(actualName.cloneNode(true));
                        leftSide.appendChild(newImage);

                        innerWindow.appendChild(leftSide);
                        innerWindow.appendChild(rightSide);

                        modalWindow.onclick = function(e){

                            if(e.target == modalWindow){
                                modalWindow.remove();
                            }
                        }
                        
                    }
                    areaForAll.appendChild(actualDiv);
                })
        }


    })
    .catch(e => {
        console.log(e);
    })

