// Hamburger
const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".header__nav");


hamburger.addEventListener("click",(e) => {
    const parent = e.target.parentElement;
    parent.classList.toggle("active");
    if(parent.classList.contains("active")){
        e.target.src=`./images/icon-close.svg`;
        nav.style.display="block";
    }else{
        e.target.src=`./images/icon-hamburger.svg`;
        nav.style.display="none";

    }
})

//ShortenerClass

class Shortener{
    constructor(){
        this.url=null;
        this.request=null;
        this.shortenerUrl=null;
        this.copy=null;
    }
    addUrl(value){
        this.url=value;
        this.request=`https://api.shrtco.de/v2/shorten?url=${this.url}`;
        this.requestApi();
    }
    requestApi(){
        fetch(this.request)
            .then(res=>res.json())
            .then(data=>{
                const {result}=data;
                this.shortenerUrl=result.full_short_link;
                this.intoHTML();
            });
    }
    intoHTML(){
        const template = document.querySelector("#shortenerElement").content.cloneNode(true);
        const apiRequestList = document.querySelector(".statistics__api");
        const div = document.createElement("div");
        div.classList.add("statistics__api-result");
        div.appendChild(template);
        div.querySelector(".statistics__api-url").innerHTML=this.url;
        div.querySelector(".statistics__api-shorturl").innerHTML=this.shortenerUrl;
        this.copy=div.lastElementChild;
        apiRequestList.appendChild(div);
        this.copyUrl();
    }
    copyUrl(){
        this.copy.addEventListener('click',(e) => {
            document.querySelectorAll(".statistics__api-btn").forEach((el) => {
                el.innerHTML="Copy";
                el.style.backgroundColor=`hsl(180, 66%, 49%)`;
            });
            const tempInput = document.createElement("input");
            document.body.appendChild(tempInput);
            tempInput.setAttribute('value',e.target.previousElementSibling.innerHTML);
            tempInput.select();
            if(document.execCommand("copy")){
                e.target.innerHTML="Copied!";
                e.target.style.backgroundColor=`hsl(255, 11%, 22%)`;
            }
            document.body.removeChild(tempInput);
            
        })
    }
}

const form = document.querySelector(".shortener__form");
const error = document.querySelector(".statistics__shortener-error");



form.addEventListener("submit",(e) => {
    e.preventDefault();
    const input = e.target.children[0];
    const reg = new RegExp("/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi");

    if(!input.value && !input.value.match(reg)){
        error.style.display="block";
        input.style.border="1px solid red";
    }else{
        const shortener = new Shortener();
        shortener.addUrl(input.value);
        input.style.border="none";
        error.style.display="none";
    }
});
