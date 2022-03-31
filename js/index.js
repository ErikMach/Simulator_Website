//if ('serviceWorker' in navigator) {navigator.serviceWorker.register('./service-worker.js');};

// For React Element keys
let keyCount = 0;

const keyCounter = () => {
  keyCount++;
  return keyCount;
};

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
  if (document.getElementsByClassName('noWidth').length < 3) {
   for (i=0; i<3; i++) {
    if (!document.getElementsByClassName('labelInfo')[i].classList.contains('noWidth')) {document.getElementsByClassName('labelInfo')[i].classList.add('noWidth')};
   }
  };
  e.currentTarget.children[0].classList.remove('noWidth');
  const b = new THREE.Vector3();
  e.currentTarget.parent3D.getWorldPosition(b);
  tweenCamera(vecAdd(b.toArray(),[0,0,0.03]), b.toArray());

  e.currentTarget.classList.add("visitedLabel");
  if (document.getElementsByClassName("visitedLabel").length >= 3) {
	explrComp = true;
	console.log('Next!!');
  }
};

const unZoomTag = (e) => {
  e.stopPropagation();
  e.currentTarget.parentElement.classList.add('noWidth');
  tweenCamera(pieces["RGB LEDs"]["1"].camera.pos, pieces["RGB LEDs"]["1"].camera.look);
};


const pieces = {
  "RGB LEDs": {
    "config": ["base4x4", "top4x4", "RGB LEDs"],
    "0": {
      "camera": {"pos": [-0.02, 0.1, 0.01], "look": [-0.02, 0, 0]},
      "anim": {"top4x4": {"pos":[0,0,0]}, "RGB LEDs":{"pos":[-0.00003354529326315969, 0.006070385221391916, -0.00007747599738650024],"rot":[0,0,0]}},
      "elems" : [
	{children: "Phones, TVs, Christmas lights - coloured lights are everwhere. An RGB LED combines the primary colours of light to produce any colour imaginable!"},
	{tag: "img", props: {src: "./res/img/christmas_lights.png"}},
	{tag: "img", props: {src: "./res/img/traffic_lights.png"}},
	{children: "A combination of a single Red, Green and Blue LED put together in a housing that allows the selection of more colours by combining each coloured light."}
      ]
    },
    "1": {
      "p":"Let's take a look inside!",
      "camera":{"pos":[0,0.05,0.06],"look":[0,0.04,0]},
      "anim": {"top4x4": {"pos":[0,0.06,0]}, "RGB LEDs":{"pos":[0,0.04,0],"rot":[Math.PI/2.7,0,0]}},
      "labels":[
	{"tag":"div", "content":1, "class":"", "events":{"click": zoomTag}, "pos":[0,0,1], "children":[3]},
	{"tag":"div", "content":2, "class":"", "events":{"click": zoomTag}, "pos":[0,0,0.45], "children":[4]},
	{"tag":"div", "content":3, "class":"", "events":{"click": (e) => {zoomTag(e);}}, "pos":[-0.65,0,-0.07], "children":[5]},
	{"tag":"div", "content":"This is where the electricity comes in", "class":"labelInfo noWidth"},
	{"tag":"div", "content":"This small black box is a <em>Logic Chip</em>.<br>It tells each light how bright to shine.<br> It sorts the electrical signal, then directs the correct amount of electricity to each LED.", "class":"labelInfo noWidth rightLabel"},
	{"tag":"div", "content":"This single light contains 3 LEDs. Can you spot them? One Red, one Green and one Blue.<br>These are the 3 primary colors of light.", "class":"labelInfo noWidth rightLabel"}
      ]
    },
    "2": {
      "p":"Change the amounts of Red, Green, and Blue in this LED to make different colours! (Have some goals i.e.: make blue, orange, ...)",
      "camera":{"pos":[-0.02,0.05,0.06],"look":[-0.02,0.04,0]},
      "anim": {"top4x4": {"pos":[0,0.06,0]}, "RGB LEDs":{"pos":[0,0.04,0],"rot":[Math.PI/2.7,0,0]}}
    },
    "3": {
      "p":"Now use the RGB colour chart to create the right colours.",
      "camera":{"pos":[-0.02,0.05,0.06],"look":[-0.02,0.04,0]},
      "anim": {"top4x4": {"pos":[0,0.06,0]}, "RGB LEDs":{"pos":[0,0.04,0],"rot":[Math.PI/2.7,0,0]}}
    },
    "4": {
      "p":"Congratulations for completing the RGB LED learning module! Check out the EdgeUQeusts you've unlocked: [list them] || Return to Hardware/EdgeULab/Simulator (??)",
      "camera": {"pos": [0, 0.1, 0.03], "look": [0, 0, 0]},
      "anim": {"top4x4": {"pos":[0,0,0]}, "RGB LEDs":{"pos":[-0.00003354529326315969, 0.006070385221391916, -0.00007747599738650024],"rot":[0,0,0]}}
    },
    "functions" : {
      "glow": (r, g, b) => {
        var glowMesh = new THREEx.GeometricGlowMesh(scene.children[0]);
        scene.children[0].add(glowMesh.object3d);

	var insideUniforms	= glowMesh.insideMesh.material.uniforms
	insideUniforms.glowColor.value.set('hotpink')
	var outsideUniforms	= glowMesh.outsideMesh.material.uniforms
	outsideUniforms.glowColor.value.set('hotpink')
      }
    }
  }
};
const parts = ["base4x4", "top4x4"];


class card extends React.Component {
  render() {
    return e('div', {id: `${this.props.title}Card`, className: "card", style: {backgroundImage: this.props.bgImg}, onClick: this.props.onClick}, [
      e('h3', {key: keyCounter()}, this.props.title)
    ]);
  }
}

// INTRO

class explore0 extends React.Component {
  makeElems(elems) {
    const rElems = [];
    elems.forEach((el, i) => {
      if (!el.tag) {
	rElems.push(el.children);
      } else {
	el.props.key = keyCounter();
	rElems.push(e(el.tag, el.props, el.children));
      }
    });
console.log(rElems);
    return rElems;
  }
  render() {
    return [
      e('h1', {key: keyCounter(), className: ""}, this.props.name),
      e('p', {key: keyCounter(), className: "explore0P"}, this.makeElems(pieces[this.props.name]["0"].elems)),
      e('button', {key: keyCounter(), className: "", onClick: () => {renderFade('explore3DPage', e(explore1, {name: this.props.name}, null));explorePhase(this.props.name, 1);GLOW();}}, 'Explore')
    ];
  }
}
let explrComp = false;


// INSIDE (1),(2),(3)

class explore1 extends React.Component {
  constructor(props) {
    super(props);
    this.complete = props.complete || true;
  }
  shouldComponentUpdate() {
    if (this.props.complete !== explrComp) {
	this.props.complete = explrComp;
console.log('updated Component');
	return true;
    }
  }
  showButtons() {
    return (this.complete) ? [e('button', {key: keyCounter(), className: "exploreBtn exploreBackBtn", onClick: () => {renderFade('explore3DPage', e(explore1, {name: this.props.name}, null));explorePhase(this.props.name, 1)}}, 'Back'), e('button', {key: keyCounter(), className: "exploreBtn exploreNextBtn", onClick: () => {renderFade('explore3DPage', e(explore1, {name: this.props.name}, null))}}, 'Next')] : e('button', {key: keyCounter(), className: "exploreBtn exploreBackBtn", onClick: () => {renderFade('explore3DPage', e(explore1, {name: this.props.name}, null));explorePhase(this.props.name, 1)}}, 'Back');
  }
  render() {
    return [
      e('h1', {key: keyCounter(), className: ""}, this.props.name),
      e('p', {key: keyCounter(), className: "explore1P"}, pieces[this.props.name]["1"]["p"]),
      e('div', {key: keyCounter(), className: "exploreBtnContainer"}, [
	e('button', {key: keyCounter(), className: "exploreBtn exploreBackBtn", onClick: () => {renderFade('explore3DPage', e(explore0, {name: this.props.name}, null));explorePhase(this.props.name, 0)}}, 'Back'),
	e('button', {key: keyCounter(), className: "exploreBtn exploreNextBtn", onClick: () => {smallGlow();renderFade('explore3DPage', e(explore2, {name: this.props.name}, null));explorePhase(this.props.name, 2)}}, 'Next')
      ])
    ];
  }
}

// INTERACTIVE GRAPHICAL TESTING

class explore2 extends React.Component {
  render() {
    return [
      e('h1', {key: keyCounter(), className: ""}, this.props.name),
      e('p', {key: keyCounter(), className: "explore1P"}, pieces[this.props.name]["2"]["p"]),
createColorGraphReact(),
      e('div', {key: keyCounter(), className: "exploreBtnContainer"}, [
	e('button', {key: keyCounter(), className: "exploreBtn exploreBackBtn", onClick: () => {renderFade('explore3DPage', e(explore1, {name: this.props.name}, null));explorePhase(this.props.name, 1)}}, 'Back'),
	e('button', {key: keyCounter(), className: "exploreBtn exploreNextBtn", onClick: () => {renderFade('explore3DPage', e(explore3, {name: this.props.name}, null));explorePhase(this.props.name, 3)}}, 'Next')
      ])
    ];
  }
}

// CODING AND ASSESSMENT

class explore3 extends React.Component {
  render() {
    return [
      e('h1', {key: keyCounter(), className: ""}, this.props.name),
      e('p', {key: keyCounter(), className: "explore1P"}, pieces[this.props.name]["3"]["p"]),
      e('div', {key: keyCounter(), className: "exploreBtnContainer"}, [
	e('button', {key: keyCounter(), className: "exploreBtn exploreNextBtn", onClick: () => {startAutoRot();removeSprites();renderFade('explore3DPage', e(explore4, {name: this.props.name}, null));explorePhase(this.props.name, 4)}}, 'Complete')
      ])
    ]
  }
}

// COMPLETION

class explore4 extends React.Component {
  render() {
    return [
      e('h1', {key: keyCounter(), className: ""}, this.props.name),
      e('p', {key: keyCounter(), className: "explore1P"}, pieces[this.props.name]["4"]["p"]),
      e('div', {key: keyCounter(), className: "exploreBtnContainer"}, [
	e('button', {key: keyCounter(), className: "exploreBtn exploreNextBtn", onClick: () => {cancelAutoRot();renderFade('explore3DPage', e(explore3, {name: this.props.name}, null));explorePhase(this.props.name, 3)}}, 'Return to Hardware')
      ])
    ]
  }
}
console.log(e('h1', {key: keyCounter(), className: ""}, null));

const pascalMaBoi = (str) => {
  const arr = str.split(/\s/g);
  arr[0] = arr[0].toLowerCase();
  return arr.join('');
};

const components = {};
components.login = () => {
  return e('div', {className: "signInBox"}, [
    e('img', {key: keyCounter(), src: "./res/icon.webp"}, null),
    e('h1', {key: keyCounter()}, "Sign in to EdgUSim"),
    e('div', {key: keyCounter(), className: "formBox"}, [
      e('label', {key: keyCounter()}, "Username"),
      e('input', {key: keyCounter(), placeholder: "", type: "text"}, null),
      e('label', {key: keyCounter(), htmlFor: "passwordIn"}, "Password"),
      e('input', {key: keyCounter(), id: "passwordIn", placeholder: "", type: "password"}, null),
      e('p', {key: keyCounter(), id: "passwordErrorMsg"}, "Sorry, wrong password"),
      e('button', {key: keyCounter(), onClick: signIn}, "Sign In")
    ])
  ]);
};
components.activity = activityCards[userType].map((ac, i) => e(card, {key: keyCounter(), title: ac,  bgImg: `url(./res/img/${ac.split(/\s/g).join('')}.webp)`, onClick: () => {page(`${pascalMaBoi(ac)}Page`)}}, null));
components.explore = exploreCards.map((ec, i) => e(card, {key: keyCounter(), title: ec, bgImg: `url(./res/img/ComponentWebp/${ec.split(/\s/g).join('_')}.webp)`, onClick: () => {configureExplore(ec);page(`explore3DPage`, true)}}, null));
components.simulator = () => {
  return e();
};


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
  if (phaseData.labels) {
    addLabels(piece, phaseData.labels);
  } else {
    removeLabels(piece);
  };

};

configureSite();