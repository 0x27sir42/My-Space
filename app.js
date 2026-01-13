const CHAIN_ID="0x89";
const ADMIN_WALLET="0xdaf343Fa66b7ecA5e76246B47fE60857A0572A8E".toLowerCase();

let web3,account;

async function connectWallet(){
 if(!window.ethereum)return alert("Install MetaMask");
 await ethereum.request({method:"wallet_switchEthereumChain",params:[{chainId:CHAIN_ID}]});
 web3=new Web3(window.ethereum);
 account=(await ethereum.request({method:"eth_requestAccounts"}))[0];
 document.getElementById("connect").innerText=account.slice(0,6)+"..."+account.slice(-4);
 handleAdminGate();
 renderHistory("staking");
 renderHistory("presale");
 loadUserReply("staking");
 loadUserReply("presale");
 loadAdminMessages();
}

document.getElementById("connect").onclick=connectWallet;

function handleAdminGate(){
 if(account?.toLowerCase()===ADMIN_WALLET)
  document.getElementById("admin-panel").style.display="block";
}

function saveTx(type,tx){
 const k=`${type}_${account}`;
 const d=JSON.parse(localStorage.getItem(k)||"[]");
 d.unshift(tx);
 localStorage.setItem(k,JSON.stringify(d));
 renderHistory(type);
}

function renderHistory(type){
 const el=document.getElementById(type+"History");
 if(!el||!account)return;
 const d=JSON.parse(localStorage.getItem(`${type}_${account}`)||"[]");
 el.innerHTML=d.map(t=>`<li><a href="https://polygonscan.com/tx/${t}" target="_blank">${t.slice(0,12)}...</a></li>`).join("");
}

function sendSupport(type){
 const msg=document.getElementById(type+"SupportMsg").value;
 if(!msg)return alert("Empty");
 const all=JSON.parse(localStorage.getItem("support")||"[]");
 all.push({from:account,type,msg});
 localStorage.setItem("support",JSON.stringify(all));
 alert("Sent");
}

function loadUserReply(type){
 const r=localStorage.getItem(`reply_${type}_${account}`);
 if(r)document.getElementById(type+"Reply").innerText="Admin: "+r;
}

function loadAdminMessages(){
 if(account?.toLowerCase()!==ADMIN_WALLET)return;
 const box=document.getElementById("adminMessages");
 const all=JSON.parse(localStorage.getItem("support")||"[]");
 box.innerHTML=all.map(d=>`
 <div>
 <b>${d.type}</b><br>${d.from}<br>${d.msg}<br>
 <input onkeydown="if(event.key==='Enter')reply('${d.type}','${d.from}',this.value)">
 </div>`).join("");
}

function reply(type,user,msg){
 localStorage.setItem(`reply_${type}_${user}`,msg);
 alert("Reply sent");
}

function stakeZILA(){
 const tx="0x"+Math.random().toString(16).slice(2);
 saveTx("staking",tx);
}

function unstakeZILA(){
 const tx="0x"+Math.random().toString(16).slice(2);
 saveTx("staking",tx);
}

function buyPresale(){
 const tx="0x"+Math.random().toString(16).slice(2);
 saveTx("presale",tx);
   }
