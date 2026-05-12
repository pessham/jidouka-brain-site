(function () {
  const ID = 'pess';
  const PASS = 'ham';
  const KEY = 'brain_auth';

  if (sessionStorage.getItem(KEY) === '1') return;

  // ページを非表示にしてからオーバーレイを表示
  document.documentElement.style.visibility = 'hidden';

  function show() {
    document.documentElement.style.visibility = '';

    const overlay = document.createElement('div');
    overlay.id = 'auth-overlay';
    overlay.innerHTML = `
      <style>
        #auth-overlay {
          position: fixed; inset: 0; z-index: 99999;
          background: #0f1117;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Noto Sans JP', sans-serif;
        }
        #auth-box {
          background: #1a1d27;
          border: 1px solid #2a2d3d;
          border-radius: 12px;
          padding: 40px 36px;
          width: 320px;
          box-shadow: 0 8px 40px rgba(0,0,0,0.5);
        }
        #auth-box h2 {
          margin: 0 0 24px;
          font-size: 1.1em;
          color: #e0e0e0;
          text-align: center;
          letter-spacing: 0.03em;
        }
        #auth-box label {
          display: block;
          font-size: 0.75em;
          color: #888;
          margin-bottom: 4px;
          margin-top: 14px;
        }
        #auth-box input {
          width: 100%;
          box-sizing: border-box;
          padding: 10px 12px;
          background: #0f1117;
          border: 1px solid #2a2d3d;
          border-radius: 6px;
          color: #e0e0e0;
          font-size: 0.95em;
          outline: none;
          transition: border-color 0.2s;
        }
        #auth-box input:focus { border-color: #5b8dee; }
        #auth-btn {
          margin-top: 22px;
          width: 100%;
          padding: 11px;
          background: #5b8dee;
          color: #fff;
          border: none;
          border-radius: 7px;
          font-size: 0.95em;
          cursor: pointer;
          transition: background 0.2s;
        }
        #auth-btn:hover { background: #4a7add; }
        #auth-err {
          margin-top: 12px;
          font-size: 0.8em;
          color: #e05555;
          text-align: center;
          min-height: 1em;
        }
      </style>
      <div id="auth-box">
        <h2>🔒 閲覧パスワード</h2>
        <label>ID</label>
        <input id="auth-id" type="text" autocomplete="username" placeholder="ID" />
        <label>パスワード</label>
        <input id="auth-pw" type="password" autocomplete="current-password" placeholder="Password" />
        <button id="auth-btn">入る</button>
        <div id="auth-err"></div>
      </div>
    `;
    document.body.appendChild(overlay);

    const idEl  = document.getElementById('auth-id');
    const pwEl  = document.getElementById('auth-pw');
    const btn   = document.getElementById('auth-btn');
    const err   = document.getElementById('auth-err');

    idEl.focus();

    function attempt() {
      if (idEl.value === ID && pwEl.value === PASS) {
        sessionStorage.setItem(KEY, '1');
        overlay.remove();
      } else {
        err.textContent = 'IDまたはパスワードが違います';
        pwEl.value = '';
        pwEl.focus();
      }
    }

    btn.addEventListener('click', attempt);
    [idEl, pwEl].forEach(el => el.addEventListener('keydown', e => {
      if (e.key === 'Enter') attempt();
    }));
  }

  if (document.body) {
    show();
  } else {
    document.addEventListener('DOMContentLoaded', show);
  }
})();
