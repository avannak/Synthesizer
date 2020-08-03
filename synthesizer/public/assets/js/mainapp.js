
//reverb
var reverb = new Tone.Freeverb().toMaster();
reverb.wet.value = 0;
//feedbackDelay
var feedbackDelay = new Tone.PingPongDelay("4n", 0.2).toMaster();
feedbackDelay.wet.value = 0;
//synth
var synth = new Tone.AMSynth().connect(reverb);
synth.connect(feedbackDelay);
//pitchshift
var pitchshift = new Tone.PitchShift(0).toMaster();
pitchshift.wet.value = 1;
synth.connect(pitchshift);
//EQ
var eq = new Tone.EQ3(0, 0, 0).toMaster();
synth.connect(eq);


var c4key = document.getElementById('c4');
var db4key = document.getElementById('db4');
var d4key = document.getElementById('d4');
var eb4key = document.getElementById('eb4');
var e4key = document.getElementById('e4');
var f4key = document.getElementById('f4');
var gb4key = document.getElementById('gb4');
var g4key = document.getElementById('g4');
var ab4key = document.getElementById('ab4');
var a4key = document.getElementById('a4');
var bb4key = document.getElementById('bb4');
var b4key = document.getElementById('b4');
var whites = document.querySelectorAll('.key white');
//volume
var volumeslider = document.getElementById('myRange');
var volumetext = document.getElementById('volumetextvalue');
var volumeslidervalue = $("#myRange").val();
//reverb
var reverbslider = document.getElementById('myReverb');
var reverbtext = document.getElementById('reverbvolumetextvalue');
var reverbslidervalue = $("#myReverb").val();
//delay
var delayslider = document.getElementById('myDelay');
var delaytext = document.getElementById('delayvolumetextvalue');
var delayslidervalue = $("#myDelay").val();
//pitchshift
var pitchup = document.getElementById('pitchup');
var pitchdown = document.getElementById('pitchdown');
var synthpitchvalue = $("pitchup").val();
var pitchcount = 0;
var pitchvaluetext = document.getElementById('pitchlabel');
var octavecount = 0;
var greaterthanzero = false;
//knobs
var lowslider = document.getElementById('lowcontrol');
var loweqslidervalue = $("#lowslider").val();
var loweqslidertext = document.getElementById('lowcontroltextvalue');
var highslider = document.getElementById('highcontrol');
var higheqslidervalue = $("#highslider").val();
var higheqslidertext = document.getElementById('highcontroltextvalue');
//random linear gradient background button
var rndbkgbutton = document.getElementById('randombkgbutton');

rndbkgbutton.addEventListener('mouseup', function () {
    console.log('rndmback is pressed');
    var c1 = {
        r: Math.floor(255),
        g: Math.floor(35 + Math.random() * 220),
        b: Math.floor(Math.random() * 55)
    };
    var c2 = {
        r: Math.floor(255),
        g: Math.floor(35 + Math.random() * 220),
        b: Math.floor(Math.random() * 85)
    };
    c1.rgb = 'rgb(' + c1.r + ',' + c1.g + ',' + c1.b + ')';
    c2.rgb = 'rgb(' + c2.r + ',' + c2.g + ',' + c2.b + ')';
    return 'radial-gradient(at top left, ' + c1.rgb + ', ' + c2.rgb + ')';

})
function generate() {

    var hexValues = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e"];

    function populate(a) {
        for (var i = 0; i < 6; i++) {
            var x = Math.round(Math.random() * 14);
            var y = hexValues[x];
            a += y;
        }
        return a;
    }

    var newColor1 = populate('#');
    var newColor2 = populate('#');
    var angle = Math.round(Math.random() * 360);

    var gradient = "linear-gradient(" + angle + "deg, " + newColor1 + ", " + newColor2 + ")";

    document.getElementById("container").style.background = gradient;
    document.getElementById("cloud").style.background = gradient;
    document.getElementById("randombkgbutton").style.background = gradient;
    document.body.style.background = gradient;

    document.getElementById("randombkgbutton").style.background = gradient;

}
pitchup.addEventListener('mouseup', function () {
    if (octavecount >= 0) {
        greaterthanzero = true;
    }
    if (pitchcount >= 36) {
        pitchcount = 36;

    }
    if (octavecount >= 3) {
        octavecount = 3;
    }


    else {

        pitchcount += 12;
        octavecount++;


    }
    pitchvaluetext.innerHTML = 'pitch: ' + octavecount;
    console.log('greater than zero is ' + greaterthanzero);

    console.log(octavecount);
    console.log(pitchcount);
    pitchshift.pitch = pitchcount;
})

pitchdown.addEventListener('mouseup', function () {
    if (pitchcount <= -36) {
        pitchcount = -36;
    }
    if (octavecount <= -3) {
        octavecount = -3;
    } else {
        pitchcount -= 12;
        octavecount--;
    }
    pitchvaluetext.innerHTML = 'pitch: ' + octavecount;
    console.log(octavecount);


    console.log(pitchcount);
    pitchshift.pitch = pitchcount;
})


volumeslider.addEventListener("mousemove", function () {
    var x = volumeslider.value;
    var max = 100;
    var min = 0;
    var max2 = 12;
    var min = -12;

    var color = 'linear-gradient(90deg, rgb(117,252,117)' + ((x - (-12)) / (12 - (-12))
        * (100 - 0) + 0) + '%, rgb(255, 0, 0)' + ((x - (-12)) / (12 - (-12))
            * (100 - 0) + 0) + '%)';

    volumeslider.style.background = color;
})

reverbslider.oninput = function () {
    var x = reverbslider.value;
    var conversion = ((x - 0) / (100 - 0))
        * (1 - 0) + 0;


    var color = 'linear-gradient(90deg, rgb(117,252,117)' + x + '%, rgb(0, 0, 0)' + x + '%)';

    reverbslider.style.background = color;
    reverbtext.innerHTML = this.value + '%';
    reverbslidervalue = this.value;
    reverb.wet.value = conversion;
    console.log("reverb value was " + x + ", now it is " + conversion);
    console.log(reverbslidervalue);
    if (reverbslidervalue == 0) {
        reverbtext.innerHTML = 'DRY';
    }

}
delayslider.oninput = function () {

    var x = delayslider.value;
    var conversion = ((x - 0) / (100 - 0))
        * (1 - 0) + 0;
    var color = 'linear-gradient(90deg, rgb(117,252,117)' + x + '%, rgb(0, 0, 0)' + x + '%)';

    delayslider.style.background = color;
    delaytext.innerHTML = this.value + '%';
    delayslidervalue = conversion;
    console.log("delayslidervalue is now " + conversion);
    feedbackDelay.wet.value = conversion;
    if (delayslidervalue == 0) {
        delaytext.innerHTML = 'DRY';
    }

}

volumeslider.oninput = function () {
    volumetext.innerHTML = this.value + 'db';
    volumeslidervalue = this.value;
    console.log(volumeslidervalue);
    synth.volume.value = this.value;
    if (volumeslidervalue <= -12) {

        synth.volume.mute = true;
        volumeslidervalue = -100;
        console.log("synth volume mute is " + synth.volume.mute);
        console.log("volume is now " + volumeslidervalue);
    } else {
        synth.volume.mute = false;
        console.log("synth volume mute is " + synth.volume.mute);
    }
}



function keyDown(e) {

    if (e.keyCode == 65) {
        synth.triggerAttack('C4')
        c4key.style.background = '#AFAFAF';
    }
    if (e.keyCode == 87) {
        synth.triggerAttack('Db4')
        db4key.style.background = '#4C4C4C';
    }
    if (e.keyCode == 83) {
        synth.triggerAttack('D4')
        d4key.style.background = '#AFAFAF';
    }
    if (e.keyCode == 69) {
        synth.triggerAttack('Eb4')
        eb4key.style.background = '#4C4C4C';
    }
    if (e.keyCode == 68) {
        synth.triggerAttack('E4')
        e4key.style.background = '#AFAFAF';
    }
    if (e.keyCode == 70) {
        synth.triggerAttack('F4')
        f4key.style.background = '#AFAFAF';
    }
    if (e.keyCode == 84) {
        synth.triggerAttack('Gb4')
        gb4key.style.background = '#4C4C4C';
    }
    if (e.keyCode == 71) {
        synth.triggerAttack('G4')
        g4key.style.background = '#AFAFAF';
    }
    if (e.keyCode == 89) {
        synth.triggerAttack('Ab4')
        ab4key.style.background = '#4C4C4C';
    }
    if (e.keyCode == 72) {
        synth.triggerAttack('A4')
        a4key.style.background = '#AFAFAF';
    }
    if (e.keyCode == 85) {
        synth.triggerAttack('Bb4')
        bb4key.style.background = '#4C4C4C';
    }
    if (e.keyCode == 74) {
        synth.triggerAttack('B4')
        b4key.style.background = '#AFAFAF';
    }
}
function keyUp() {
    c4key.style.background = 'linear-gradient(rgb(248, 248, 248), rgb(233, 233, 233))';
    d4key.style.background = 'linear-gradient(rgb(248, 248, 248), rgb(233, 233, 233))';
    e4key.style.background = 'linear-gradient(rgb(248, 248, 248), rgb(233, 233, 233))';
    f4key.style.background = 'linear-gradient(rgb(248, 248, 248), rgb(233, 233, 233))';
    g4key.style.background = 'linear-gradient(rgb(248, 248, 248), rgb(233, 233, 233))';
    a4key.style.background = 'linear-gradient(rgb(248, 248, 248), rgb(233, 233, 233))';
    b4key.style.background = 'linear-gradient(rgb(248, 248, 248), rgb(233, 233, 233))';
    db4key.style.background = 'linear-gradient(#000000, #303030)';
    eb4key.style.background = 'linear-gradient(#000000, #303030)';
    gb4key.style.background = 'linear-gradient(#000000, #303030)';
    ab4key.style.background = 'linear-gradient(#000000, #303030)';
    bb4key.style.background = 'linear-gradient(#000000, #303030)';
    synth.triggerRelease()

}

document.addEventListener("keydown", keyDown, true);
document.onkeyup = keyUp;


c4key.addEventListener('mousedown', function () {
    synth.triggerAttack('C4')
    c4key.style.background = '#AFAFAF';

});
c4key.addEventListener('mouseup', function () {
    synth.triggerRelease()
    c4key.style.background = 'linear-gradient(rgb(248, 248, 248), rgb(233, 233, 233))';

});
c4key.addEventListener('mouseleave', function () {
    synth.triggerRelease()
    c4key.style.background = 'linear-gradient(rgb(248, 248, 248), rgb(233, 233, 233))';
});





db4key.addEventListener('mousedown', function () {
    synth.triggerAttack('Db4')
    db4key.style.background = 'linear-gradient(#3b3b3b, #696969)';

});
db4key.addEventListener('mouseup', function () {
    synth.triggerRelease()
    db4key.style.background = 'linear-gradient(#000000, #303030)';

});
db4key.addEventListener('mouseleave', function () {
    synth.triggerRelease()
    db4key.style.background = 'linear-gradient(#000000, #303030)';
});



d4key.addEventListener('mousedown', function () {
    synth.triggerAttack('D4')
    d4key.style.background = '#AFAFAF';
});
d4key.addEventListener('mouseup', function () {
    synth.triggerRelease()
    d4key.style.background = 'linear-gradient(rgb(248, 248, 248), rgb(233, 233, 233))';
});
d4key.addEventListener('mouseleave', function () {
    synth.triggerRelease()
    d4key.style.background = 'linear-gradient(rgb(248, 248, 248), rgb(233, 233, 233))';

});


eb4key.addEventListener('mousedown', function () {
    synth.triggerAttack('Eb4')
    eb4key.style.background = 'linear-gradient(#3b3b3b, #696969)';
});
eb4key.addEventListener('mouseup', function () {
    synth.triggerRelease()
    eb4key.style.background = 'linear-gradient(#000000, #303030)';
});
eb4key.addEventListener('mouseleave', function () {
    synth.triggerRelease()
    eb4key.style.background = 'linear-gradient(#000000, #303030)';
});


e4key.addEventListener('mousedown', function () {
    synth.triggerAttack('E4')
    e4key.style.background = '#AFAFAF';
});
e4key.addEventListener('mouseup', function () {
    synth.triggerRelease()
    e4key.style.background = 'linear-gradient(rgb(248, 248, 248), rgb(233, 233, 233))';
});
e4key.addEventListener('mouseleave', function () {
    synth.triggerRelease()
    e4key.style.background = 'linear-gradient(rgb(248, 248, 248), rgb(233, 233, 233))';
});


f4key.addEventListener('mousedown', function () {
    synth.triggerAttack('F4')
    f4key.style.background = '#AFAFAF';
});
f4key.addEventListener('mouseup', function () {
    synth.triggerRelease()
    f4key.style.background = 'linear-gradient(rgb(248, 248, 248), rgb(233, 233, 233))';
});
f4key.addEventListener('mouseleave', function () {
    synth.triggerRelease()
    f4key.style.background = 'linear-gradient(rgb(248, 248, 248), rgb(233, 233, 233))';
});


gb4key.addEventListener('mousedown', function () {
    synth.triggerAttack('Gb4')
    gb4key.style.background = 'linear-gradient(#3b3b3b, #696969)';
});
gb4key.addEventListener('mouseup', function () {
    synth.triggerRelease()
    gb4key.style.background = 'linear-gradient(#000000, #303030)';
});
gb4key.addEventListener('mouseleave', function () {
    synth.triggerRelease()
    gb4key.style.background = 'linear-gradient(#000000, #303030)';
});


g4key.addEventListener('mousedown', function () {
    synth.triggerAttack('G4')
    g4key.style.background = '#AFAFAF';
});
g4key.addEventListener('mouseup', function () {
    synth.triggerRelease()
    g4key.style.background = 'linear-gradient(rgb(248, 248, 248), rgb(233, 233, 233))';
});
g4key.addEventListener('mouseleave', function () {
    synth.triggerRelease()
    g4key.style.background = 'linear-gradient(rgb(248, 248, 248), rgb(233, 233, 233))';
});


ab4key.addEventListener('mousedown', function () {
    synth.triggerAttack('Ab4')
    ab4key.style.background = 'linear-gradient(#3b3b3b, #696969)';
});
ab4key.addEventListener('mouseup', function () {
    synth.triggerRelease()
    ab4key.style.background = 'linear-gradient(#000000, #303030)';
});
ab4key.addEventListener('mouseleave', function () {
    synth.triggerRelease()
    ab4key.style.background = 'linear-gradient(#000000, #303030)';
});


a4key.addEventListener('mousedown', function () {
    synth.triggerAttack('A4')
    a4key.style.background = '#AFAFAF';
});
a4key.addEventListener('mouseup', function () {
    synth.triggerRelease()
    a4key.style.background = 'linear-gradient(rgb(248, 248, 248), rgb(233, 233, 233))';
});
a4key.addEventListener('mouseleave', function () {
    synth.triggerRelease()
    a4key.style.background = 'linear-gradient(rgb(248, 248, 248), rgb(233, 233, 233))';

});


bb4key.addEventListener('mousedown', function () {
    synth.triggerAttack('Bb4')
    bb4key.style.background = 'linear-gradient(#3b3b3b, #696969)';
});
bb4key.addEventListener('mouseup', function () {
    synth.triggerRelease()
    bb4key.style.background = 'linear-gradient(#000000, #303030)';
});
bb4key.addEventListener('mouseleave', function () {
    synth.triggerRelease()
    bb4key.style.background = 'linear-gradient(#000000, #303030)';
});


b4key.addEventListener('mousedown', function () {
    synth.triggerAttack('B4')
    b4key.style.background = '#AFAFAF';
});
b4key.addEventListener('mouseup', function () {
    synth.triggerRelease()
    b4key.style.background = 'linear-gradient(rgb(248, 248, 248), rgb(233, 233, 233))';
});
b4key.addEventListener('mouseleave', function () {
    synth.triggerRelease()
    b4key.style.background = 'linear-gradient(rgb(248, 248, 248), rgb(233, 233, 233))';
});