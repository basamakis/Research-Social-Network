const seeBio = () => {

    let bio = document.querySelector('.bio');
    console.log(bio.textContent.length);
    function bioText() {
        if (bio.textContent.length > 150) {
            let str1 = bio.textContent.substr(0, 150)
            let str2 = bio.textContent.substr(150, bio.textContent.length)
            bio.innerHTML = str1;
            document.querySelector('.more-a').addEventListener("click", () => {
                bio.innerHTML = str1 + str2;
                console.log(bio.textContent.length)
                document.querySelector(".more").classList.remove('active');
                document.querySelector(".more-a").classList.remove('active');
                document.querySelector(".less").classList.add('active');
                document.querySelector('.less').addEventListener("click", () => {
                    document.querySelector(".less").classList.remove('active');
                    bioText();
                });
            });
            document.querySelector(".more").classList.add('active');
            document.querySelector(".more-a").classList.add('active');
            console.log("i'm in")
        }
    }
    bioText();
}

const editBut = () => {
    document.addEventListener("click", (evt) => {
        const flyoutElement1 = document.getElementById("edit");
        let targetElement1 = evt.target; // clicked element
        console.log('edw eimai')
        do {
            if (targetElement1 == flyoutElement1) {
                // Do nothing, just return.
                document.querySelector("#edit").classList.toggle("focused1");
                document.getElementById("myDropdown1").classList.toggle("show1");
                return;
            }
            // Go up the DOM.
            targetElement1 = targetElement1.parentNode;
        } while (targetElement1);

        // Do something useful here.
        document.getElementById("myDropdown1").classList.remove("show1");
    });
}

const showModal = () => {
    let but0 = document.getElementById('but0');
    let but1 = document.getElementById('but1');
    let but2 = document.getElementById('but2');
    let but3 = document.getElementById('but3');
    let but4 = document.getElementById('but4');
    let but5 = document.getElementById('but5');
    let but6 = document.getElementById('but6');


    let modal0 = document.getElementById('id00');
    let modal1 = document.getElementById('id01');
    let modal2 = document.getElementById('id02');
    let modal3 = document.getElementById('id03');
    let modal4 = document.getElementById('id04');
    let modal5 = document.getElementById('id05');
    let modal6 = document.getElementById('id06');

    window.onclick = function (event) {
        if (event.target === but1) {
            document.getElementById('id01').style.display = "block";
            document.getElementById('id01').firstElementChild.style.height = "240px";
        }
        else if (event.target === but2) {
            document.getElementById('id02').style.display = "block";
            document.getElementById('id02').firstElementChild.style.height = "160px";
        }
        else if (event.target === but3) {
            document.getElementById('id03').style.display = "block";
            document.getElementById('id03').firstElementChild.style.height = "150px";
        }
        else if (event.target === but4) {
            document.getElementById('id04').style.display = "block";
            document.getElementById('id04').firstElementChild.style.height = "270px";
        }
        else if (event.target === but5) {
            document.getElementById('id05').style.display = "block";
            document.getElementById('id05').firstElementChild.style.height = "458px";
        }
        else if (event.target === but6) {
            document.getElementById('id06').style.display = "block";
            document.getElementById('id06').firstElementChild.style.height = "160px";
        }
        else if (event.target === but0) {
            document.getElementById('id00').style.display = "block";
            document.getElementById('id00').firstElementChild.style.height = "160px";
        }


        if (event.target === id01) {
            modal1.style.display = "none";
        }
        else if (event.target === modal2) {
            modal2.style.display = "none";
        }
        else if (event.target === modal3) {
            modal3.style.display = "none";
        }
        else if (event.target === modal4) {
            modal4.style.display = "none";
        }
        else if (event.target === modal5) {
            modal5.style.display = "none";
        }
        else if (event.target === modal6) {
            modal6.style.display = "none";
        }
        else if (event.target === modal0) {
            modal0.style.display = "none";
        }
    }
}


showModal();
editBut();
seeBio();

