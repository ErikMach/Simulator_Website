if ('serviceWorker' in navigator) {navigator.serviceWorker.register('./service-worker.js');};

const e = React.createElement;
let userType = "student";
let labelRendererElem, currentElems;
let prevPage = 'activityPage';
const activityCards = {
  "commercialUser": ["Explore", "Simulator", "Mini Projects", "Environments"],
  "student": ["Explore", "Simulator", "Mini Projects", "Environments"],
  "teacher": ["Explore", "Teaching Material", "Simulator", "Mini Projects", "Environments"]
};
const exploreCards = [
  "RGB LEDs","Switch","Rotary Knob","LED Display","DC Motor"
];
const explore3DElements = {
  "h1":{"tag":"h1","text":"Bananas"}
};

const zoomTag = (e) => {
  e.currentTarget.children[0].classList.remove('noWidth');
  const b = new THREE.Vector3();
  e.currentTarget.parent3D.getWorldPosition(b);
  tweenCamera(vecAdd(b.toArray(),[0,0,0.03]), b.toArray());
};

const pieces = {
  "RGB LEDs": {
    "config": ["base4x4", "top4x4", "RGB LEDs"],
    "intro": "Phones, TVs, Christmas lights - coloured lights are everwhere. An RGB LED combines the primary colours of light to produce any colour imaginable!",
    "1": {
      p:"A combination of a single Red, Green and Blue LED put together in a housing that allows the selection of more colours by combining each coloured light.",
      "camera":{"pos":[0,0.05,0.08],"look":[0,0.02,0]}
    },
    "2": {
      "p":"Let's take a look inside!",
      "camera":{"pos":[0,0.06,0.1],"look":[0,0.04,0]},
      "anim": {"top4x4": {"pos":[0,0.06,0]}, "RGB LEDs":{"pos":[0,0.04,0],"rot":[Math.PI/2.7,0,0]}},
      "labels":[
	{"tag":"div", "content":1, "class":"", "events":{"click": zoomTag}, "pos":[0,0,1], "children":[3]},
	{"tag":"div", "content":2, "class":"", "events":{"click": zoomTag}, "pos":[-0.2,0,0.6], "children":[4]},
	{"tag":"div", "content":3, "class":"", "events":{"click": (e) => {zoomTag(e);}}, "pos":[-0.65,0,-0.07], "children":[5]},
	{"tag":"div", "content":"This is where the electricity comes in", "class":"labelInfo noWidth"},
	{"tag":"div", "content":"This small black box is called a <em>Logic Chip</em>.<br>It tells each light how bright it should be. It sorts the electrical signal and directs the correct amount of electricity to each LED.", "class":"labelInfo noWidth rightLabel"},
	{"tag":"div", "content":"This single light contains 3 LEDs. Can you spot them? One Red, one Green and one Blue.<br>These are the 3 primary colors of light.", "class":"labelInfo noWidth rightLabel"}
      ]
    }
  }
};
const parts = ["base4x4", "top4x4"];


class card extends React.Component {
  render() {
    return e('div', {id: `${this.props.title}Card`, className: "card", style: {backgroundImage: this.props.bgImg}, onClick: this.props.onClick}, [
      e('h3', {key: 10}, this.props.title)
    ]);
  }
}

class explore0 extends React.Component {
  render() {
    return [
      e('h1', {key: 11, className: ""}, this.props.name),
      e('p', {key: 12, className: "explore0P"}, pieces[this.props.name].intro),
      e('button', {key: 13, className: "", onClick: () => {renderFade('explore3DPage', e(explore1, {name: this.props.name}, null));explorePhase(this.props.name, 1)}}, 'Explore')
    ];
  }
}

class explore1 extends React.Component {
  render() {
    return [
      e('h1', {key: 14, className: ""}, this.props.name),
      e('p', {key: 15, className: "explore1P"}, pieces[this.props.name]["1"]["p"]),
      e('div', {key: 18, className: "exploreBtnContainer"}, [
	e('button', {key: 16, className: "exploreBtn exploreBackBtn", onClick: () => {renderFade('explore3DPage', e(explore0, {name: this.props.name}, null));explorePhase(this.props.name, 0)}}, 'Back'),
	e('button', {key: 17, className: "exploreBtn exploreNextBtn", onClick: () => {GLOW();renderFade('explore3DPage', e(explore2, {name: this.props.name}, null));explorePhase(this.props.name, 2)}}, 'Next')
      ])
    ];
  }
}

class explore2 extends React.Component {
  render() {
    return [
      e('h1', {key: 14, className: ""}, this.props.name),
      e('p', {key: 15, className: "explore1P"}, pieces[this.props.name]["2"]["p"]),
      e('div', {key: 18, className: "exploreBtnContainer"}, [
	e('button', {key: 16, className: "exploreBtn exploreBackBtn", onClick: () => {renderFade('explore3DPage', e(explore1, {name: this.props.name}, null));explorePhase(this.props.name, 1)}}, 'Back'),
/*
	e('button', {key: 17, className: "exploreBtn exploreNextBtn", onClick: () => {renderFade('explore3DPage', e(explore1, {name: this.props.name}, null))}}, 'Next')
*/
      ])
/*
      e('div', {key: 19, id: "labelRenderer", dangerouslySetInnerHTML: { __html: labelRendererElem.innerHTML}}, null)
*/
    ];
  }
}

console.log(e('h1', {key: 100, className: ""}, null));

const pascalMaBoi = (str) => {
  const arr = str.split(/\s/g);
  arr[0] = arr[0].toLowerCase();
  return arr.join('');
};

const components = {};
components.login = () => {
  return e('div', {className: "signInBox"}, [
    e('img', {key:1, src: "./res/icon.webp"}, null),
    e('h1', {key: 2}, "Sign in to EdgUSim"),
    e('div', {key:3, className: "formBox"}, [
      e('label', {key: 4}, "Username"),
      e('input', {key: 5, placeholder: "", type: "text"}, null),
      e('label', {key: 6, htmlFor: "passwordIn"}, "Password"),
      e('input', {key: 7, id: "passwordIn", placeholder: "", type: "password"}, null),
      e('p', {key: 8, id: "passwordErrorMsg"}, "Sorry, wrong password"),
      e('button', {key: 9, onClick: signIn}, "Sign In")
    ])
  ]);
};
components.activity = activityCards[userType].map((ac, i) => e(card, {key: `ac${i}`, title: ac,  bgImg: `url(./res/img/${ac.split(/\s/g).join('')}.webp)`, onClick: () => {page(`${pascalMaBoi(ac)}Page`)}}, null));
components.explore = exploreCards.map((ec, i) => e(card, {key: `ec${i}`, title: ec, bgImg: `url(./res/img/ComponentWebp/${ec.split(/\s/g).join('_')}.webp)`, onClick: () => {configureExplore(ec);page(`explore3DPage`, true)}}, null));

const configureSite = () => {
  ReactDOM.render(components.login(), document.getElementById('loginPage'));
};

window.addEventListener('keydown', (e) => {
console.log(e);
  if (e.keyCode === 8) {
    page(prevPage);
  }
});

const page = (newPageId, noRender) => {
console.log('Redirecting to:', newPageId);
prevPage =  document.getElementsByClassName('currentPage')[0].id
  document.getElementsByClassName('currentPage')[0].classList.add('transparent');
  document.getElementById(newPageId).classList.add('transparent', 'display');
  setTimeout(() => {
    ReactDOM.render(null, document.getElementsByClassName('currentPage')[0]);
    if (!noRender) {ReactDOM.render(components[newPageId.slice(0,-4)], document.getElementById(newPageId))};
    document.getElementsByClassName('currentPage')[0].classList.remove('display', 'currentPage');
    document.getElementById(newPageId).classList.remove('transparent');
    document.getElementById(newPageId).classList.add('currentPage');
  }, 500);
};

const renderFade = (pageId, newElems) => {
  const currentPage = document.getElementById(pageId);
  currentPage.classList.add('transparent');
  setTimeout(() => {
    ReactDOM.render(null, currentPage);
    ReactDOM.render(newElems, currentPage);
    currentPage.classList.remove('transparent');
  }, 500);

currentElems = newElems;
console.log(currentElems);
};

const signIn = () => {
  if (!verifyPassword()) {wrongPassword(); return;};
  console.log("Password Correct");
  page('activityPage');
};

const verifyPassword = () => {
  //PHP stuff goes here
  return (document.getElementById('passwordIn').value === "") ? true : false;
};
const wrongPassword = () => {
  document.getElementById('passwordErrorMsg').classList.add('pHeight');
};

const activate = (newPageId) => {
  page(newPageId);
};

const configureExplore = (piece) => {
  ReactDOM.render(e(explore0, {name: piece}, null), document.getElementById('explore3DPage'));
  initExplore(piece);
};
const explorePhase = (piece, phaseNum) => {
  const phaseData = pieces[piece][phaseNum];
  const newCam = phaseData["camera"];
  tweenCamera(newCam.pos, newCam.look);
  if (phaseData.anim) {
    for (x in phaseData.anim) {
      tweenAnims(x, phaseData.anim[x]);
    }
  }
  if (phaseData.labels) addLabels(piece, phaseData.labels);

};

configureSite();