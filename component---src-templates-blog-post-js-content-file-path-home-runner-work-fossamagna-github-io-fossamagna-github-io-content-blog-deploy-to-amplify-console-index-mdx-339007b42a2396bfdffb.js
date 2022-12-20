"use strict";(self.webpackChunkfossamagna_github_io=self.webpackChunkfossamagna_github_io||[]).push([[284],{9012:function(e,n,a){a.r(n),a.d(n,{Head:function(){return g},default:function(){return f}});var t=a(3366),l=a(6410),s=a(7294);function i(e){var n=Object.assign({p:"p",a:"a",h2:"h2",code:"code",img:"img",div:"div",h3:"h3",h4:"h4",ul:"ul",li:"li"},(0,l.ah)(),e.components);return s.createElement(s.Fragment,null,s.createElement(n.p,null,"この記事は ",s.createElement(n.a,{href:"https://qiita.com/advent-calendar/2022/amplify"},"AWS AmplifyとAWS×フロントエンド Advent Calendar 2022"),"、",s.createElement(n.a,{href:"https://adventar.org/calendars/7633"},"AWS Community Builders Advent Calendar 2022")," と ",s.createElement(n.a,{href:"https://adventar.org/calendars/8218"},"ESM Advent Calendar 2022")," の 20 日目の記事です。\n欲張って3つもクロスポストしてしまいました。"),"\n",s.createElement(n.h2,{id:"deploy-to-amplify-consoleボタン"},s.createElement(n.code,null,"Deploy to Amplify Console"),"ボタン"),"\n",s.createElement(n.p,null,s.createElement(n.a,{href:"https://docs.aws.amazon.com/amplify/latest/userguide/one-click.html"},"公式のAmplifyユーザーガイド"),"にも書かれている以下のボタンのことです。"),"\n",s.createElement(n.p,null,s.createElement(n.img,{src:"https://oneclick.amplifyapp.com/button.svg",alt:"amplifybutton"})),"\n",s.createElement(n.p,null,"このボタンをブログやGitHubリポジトリのREADME.mdなどに設置すると、そのGitHubリポジトリのAmplifyアプリをワンクリックでデプロイできるというものです。"),"\n",s.createElement(n.p,null,"ただ、私はこのボタンを見たことがなく、ユーザーガイドの説明もシンプルなので具体的にどういう使い勝手なのかが想像できませんでした。また紹介した記事も見たことがなかったので実際にどんな風に使えるのか試してみました。"),"\n",s.createElement(n.h2,{id:"実際にボタンを設置してみた"},"実際にボタンを設置してみた"),"\n",s.createElement(n.p,null,s.createElement(n.a,{href:"https://github.com/fossamagna/amplify-slack-bot"},"https://github.com/fossamagna/amplify-slack-bot")," のリポジトリのREADME.mdに設置しました。ボタン自体は単なるリンクなのでMarkdownなら以下のように書くことで簡単に設置できます。"),"\n",s.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="md"><pre class="language-md"><code class="language-md"><span class="token url">[<span class="token content">![amplifybutton</span>](<span class="token url">https://oneclick.amplifyapp.com/button.svg</span>)</span>](https://console.aws.amazon.com/amplify/home#/deploy?repo=https://github.com/fossamagna/amplify-slack-bot)</code></pre></div>'}}),"\n",s.createElement(n.p,null,s.createElement(n.a,{href:"https://console.aws.amazon.com/amplify/home#/deploy?repo=https://github.com/fossamagna/amplify-slack-bot"},s.createElement(n.img,{src:"https://oneclick.amplifyapp.com/button.svg",alt:"amplifybutton"}))," そして、これが実際に設置したボタンです（クリックすると操作します）。"),"\n",s.createElement(n.p,null,"ちなみに、今回このボタンでデプロイできるのは、Amplify Consoleのビルド結果をSlackに通知するアプリです。\n以前から、amplify cliのプラグインとして公開していた ",s.createElement(n.a,{href:"https://github.com/fossamagna/amplify-category-console-notification"},"https://github.com/fossamagna/amplify-category-console-notification")," をアプリにしたものです。"),"\n",s.createElement(n.h2,{id:"ボタンを押してみる"},"ボタンを押してみる"),"\n",s.createElement(n.p,null,"実際にボタンをクリックするとGitHubと接続する画面が表示されます。もし、AWSコンソールにログインしていない場合はログイン画面が表示されて、ログインするとこの画面が表示されます。",s.createElement(n.code,null,"Connect to GitHub"),"ボタンをクリックしてGitHubと接続します。\n",s.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<span\n      class="gatsby-resp-image-wrapper"\n      style="position: relative; display: block; margin-left: auto; margin-right: auto; max-width: 1280px; "\n    >\n      <a\n    class="gatsby-resp-image-link"\n    href="/static/71843327a1379434f38fb0ffd08df595/c27e7/welcome-to-amplify-hosting.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n    <span\n    class="gatsby-resp-image-background-image"\n    style="padding-bottom: 53.125%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAABYlAAAWJQFJUiTwAAABvklEQVQoz5WST2/TMByG8yH5InyXcUEc4AyXcaiYhHagHUKVioZYm2Sp6JpkSZw/jf2znbQd7J3sJF2LuHB45D+yH/v92U7CCtwlOdKMIU5S5GWJwlJZWFH8F46RTL9fY+F6uJkv8PNmjvnCtX0/CCCV6pGHlqQ8Gp/iZIzB83x4/q3Fvw0QLJdwPR/rMLKLBNEBI1Na2/Z4fsAxG1LG7MD0ddN0aI34PkFZVeBCHGQ15/Yg01rpIJYSNAij+B6r1Z2tHUkNIRtwqbEOQ0RxjLKq7WFGYORhFCFjObggSOrE1Eud7W6HydUVXp2dIWMF5CbBw6cXaPwP0HuASGA6vkDOUiil7ca2aZDmNfT1a5SLEbjaQ1KXwmnaFrPZDB/Pz20UUaXYj19CL0eQ20dkSYTx5QjrVWBLIYSAlApZluHb5/dwf0whzQ0F74RDkZumtXUjpSH0HkJtQZLAOe+pD9EMytS+4Ni0fyBNkt2j3ev867VMTDp6VZLK8vzShLyqUSe/QF/egE/egk/eQbDwVEiD4Kj/95cZ1nGS4GUG7o4hvAm4/xVikz8Lu5t03+DkkH58zLDGRKTt754Hm+IJzU84qmDQqYsAAAAASUVORK5CYII=\'); background-size: cover; display: block;"\n  ></span>\n  <img\n        class="gatsby-resp-image-image"\n        alt="welcome-to-amplify-hosting"\n        title="welcome-to-amplify-hosting"\n        src="/static/71843327a1379434f38fb0ffd08df595/21b4d/welcome-to-amplify-hosting.png"\n        srcset="/static/71843327a1379434f38fb0ffd08df595/72799/welcome-to-amplify-hosting.png 320w,\n/static/71843327a1379434f38fb0ffd08df595/6af66/welcome-to-amplify-hosting.png 640w,\n/static/71843327a1379434f38fb0ffd08df595/21b4d/welcome-to-amplify-hosting.png 1280w,\n/static/71843327a1379434f38fb0ffd08df595/29114/welcome-to-amplify-hosting.png 1920w,\n/static/71843327a1379434f38fb0ffd08df595/c27e7/welcome-to-amplify-hosting.png 2144w"\n        sizes="(max-width: 1280px) 100vw, 1280px"\n        style="width:100%;height:100%;margin:0;vertical-align:middle;position:absolute;top:0;left:0;"\n        loading="lazy"\n        decoding="async"\n      />\n  </a>\n    </span>'}})),"\n",s.createElement(n.p,null,"初めて、Amplifyを使う場合は、次の画面が表示されます。アプリはAmplify Consoleを使ってデプロイされるので、",s.createElement(n.code,null,"Authorize aws-amplify-console"),"ボタンをクリックして承認します。\n",s.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<span\n      class="gatsby-resp-image-wrapper"\n      style="position: relative; display: block; margin-left: auto; margin-right: auto; max-width: 1280px; "\n    >\n      <a\n    class="gatsby-resp-image-link"\n    href="/static/d355b24eb0e543f195214048789ef803/c658e/authorize-aws-amplify.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n    <span\n    class="gatsby-resp-image-background-image"\n    style="padding-bottom: 61.875%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAYAAABiDJ37AAAACXBIWXMAABYlAAAWJQFJUiTwAAABvElEQVQoz42TSW4TQRSGsyOJZYOrp+qu6q6ubvfgeACHTRwJBFgRgyIkRCQEGxawhQtwAq6CxAYJzsEhsuIMSB9yG0M7sSCLp1eq+t9X769hJ4wHeJHFV9lGCBkzmz1gce9Vs+6GKSdPnjG/e4IIkkv6dey0gess4wHXuoKPHz7x/etPwnqIU6ecn//g85dv7HY9pM43arYC2wKdVRwfP+X00VtsNSEZjDh7+ZqHp88JTbmhbddv7XBpT6V1A5UmIy3G2HLSrKu0IskPmrEXbbOcbHbohCmJLTmaHyHjgjg7wORDorTCTUYIPaTnGfqewlf5Zcsybk/aZix1xnA8Y1CNGZRlUywCTc+RdEXQRN/XLVcty+1d1ln4Md2+xJMxoVJ0ei6dfY/Orsv+nktnz6Pv6e2XEmwBOtKwPAptayJTIZMc82LCzXd3uP3+PvmbQxxr8MMMT10BKIIY4WtiW5FVE9JihF1MyR/fwizGOPMUoRL8aA20/wa6oeGGq3ClYXnGgc4I/FU4IuF6N8IJzP8trwWBzsmqKbaaNm/OlqscmoJidIjO6r96dQXgn/wbvnqTw+YHXezoYoe/ACCZTB2l9v3sAAAAAElFTkSuQmCC\'); background-size: cover; display: block;"\n  ></span>\n  <img\n        class="gatsby-resp-image-image"\n        alt="authorize-aws-amplify"\n        title="authorize-aws-amplify"\n        src="/static/d355b24eb0e543f195214048789ef803/21b4d/authorize-aws-amplify.png"\n        srcset="/static/d355b24eb0e543f195214048789ef803/72799/authorize-aws-amplify.png 320w,\n/static/d355b24eb0e543f195214048789ef803/6af66/authorize-aws-amplify.png 640w,\n/static/d355b24eb0e543f195214048789ef803/21b4d/authorize-aws-amplify.png 1280w,\n/static/d355b24eb0e543f195214048789ef803/29114/authorize-aws-amplify.png 1920w,\n/static/d355b24eb0e543f195214048789ef803/c658e/authorize-aws-amplify.png 2202w"\n        sizes="(max-width: 1280px) 100vw, 1280px"\n        style="width:100%;height:100%;margin:0;vertical-align:middle;position:absolute;top:0;left:0;"\n        loading="lazy"\n        decoding="async"\n      />\n  </a>\n    </span>'}})),"\n",s.createElement(n.p,null,"次に、デプロイするアプリの名前とデプロイ時のサービスロールを指定します。自分でAmplifyアプリをデプロイするときにも入力する項目なのでAmplifyを使ったことがある人には馴染みがあるかもしれません。初めてAmplify Consoleを利用する方は",s.createElement(n.a,{href:"https://docs.aws.amazon.com/amplify/latest/userguide/how-to-service-role-amplify-console.html"},"こちらのドキュメント"),"に書かれた手順でサービスロールを追加する必要があります。\nまた、デプロイするアプリが利用するAWSサービスによっては通常のAmplifyのサービスロールでは足りないこともあります。リポジトリのREADME.mdなどアプリのドキュメントに追加で必要な権限がないか確認してみてください。"),"\n",s.createElement(n.p,null,s.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<span\n      class="gatsby-resp-image-wrapper"\n      style="position: relative; display: block; margin-left: auto; margin-right: auto; max-width: 1280px; "\n    >\n      <a\n    class="gatsby-resp-image-link"\n    href="/static/9f54d8816fbea284940689f4de0c352a/e4d4a/deploy-app.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n    <span\n    class="gatsby-resp-image-background-image"\n    style="padding-bottom: 64.375%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAYAAACpUE5eAAAACXBIWXMAABYlAAAWJQFJUiTwAAABs0lEQVQ4y52T227UMBRF58954IsQD/wDTyAKU6hAo85kJplc7Pju3Bay0w4FWqpiaekkjryzzz7JRinNvmo4VjXHsqRuWzop6YT4DySbaZq4vvnOx09XfNle5wfGGJTWaGNeRDqzCTHSth2HQ8GhKLDWkl4yDAMxxheRRDchRKQVlH3BsT5wqPcU9Z5jW9B7gXAtNhpYYFmWJ0nLOrc6FKrjUO0RukO5PqO9wo8ON1iGKeYDC+vBp9adYMi9n04VbSdIjmMccnXO43zINUWQ5J516EPIFwmlDUL2CCmRfZ9FUp6JeZ5Xl/9oe3UYAunTqc41ddPmTWNtDjgJzhfBiXGaVjcPXD3ScqRXmuOpojzXVHWDsY4QB1yI+NS6D3mvt54wTGhr8T785viXYPA0JvC1lFz9KPi8O3K9rzLb25LtbcW3oqY0I2cd2J0adlWHcOMfgst9hh7tI432nFpJJRStdjTKXuiMx8Q5o/yADiN+nO9a5zL7B0OxaK1RSuW6zPNfTNOYSZmuuY4523EcGYbIOMScfR5Kn4Tufx9j8v1zyF5SNpLuwzvkm1eIt6+RN+/5CRpg688+mETyAAAAAElFTkSuQmCC\'); background-size: cover; display: block;"\n  ></span>\n  <img\n        class="gatsby-resp-image-image"\n        alt="deploy-app"\n        title="deploy-app"\n        src="/static/9f54d8816fbea284940689f4de0c352a/21b4d/deploy-app.png"\n        srcset="/static/9f54d8816fbea284940689f4de0c352a/72799/deploy-app.png 320w,\n/static/9f54d8816fbea284940689f4de0c352a/6af66/deploy-app.png 640w,\n/static/9f54d8816fbea284940689f4de0c352a/21b4d/deploy-app.png 1280w,\n/static/9f54d8816fbea284940689f4de0c352a/29114/deploy-app.png 1920w,\n/static/9f54d8816fbea284940689f4de0c352a/e4d4a/deploy-app.png 2198w"\n        sizes="(max-width: 1280px) 100vw, 1280px"\n        style="width:100%;height:100%;margin:0;vertical-align:middle;position:absolute;top:0;left:0;"\n        loading="lazy"\n        decoding="async"\n      />\n  </a>\n    </span>'}})),"\n",s.createElement(n.p,null,s.createElement(n.code,null,"amplify-slack-bot"),"ではサービスロールに以下の権限の追加が必要です。"),"\n",s.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="json"><pre class="language-json"><code class="language-json"><span class="token punctuation">{</span>\n    <span class="token property">"Version"</span><span class="token operator">:</span> <span class="token string">"2012-10-17"</span><span class="token punctuation">,</span>\n    <span class="token property">"Statement"</span><span class="token operator">:</span> <span class="token punctuation">[</span>\n        <span class="token punctuation">{</span>\n            <span class="token property">"Sid"</span><span class="token operator">:</span> <span class="token string">"VisualEditor0"</span><span class="token punctuation">,</span>\n            <span class="token property">"Effect"</span><span class="token operator">:</span> <span class="token string">"Allow"</span><span class="token punctuation">,</span>\n            <span class="token property">"Action"</span><span class="token operator">:</span> <span class="token punctuation">[</span>\n                <span class="token string">"lambda:CreateFunctionUrlConfig"</span><span class="token punctuation">,</span>\n                <span class="token string">"lambda:GetFunctionUrlConfig"</span><span class="token punctuation">,</span>\n                <span class="token string">"lambda:DeleteFunctionUrlConfig"</span><span class="token punctuation">,</span>\n                <span class="token string">"lambda:UpdateFunctionUrlConfig"</span><span class="token punctuation">,</span>\n                <span class="token string">"sns:GetTopicAttributes"</span><span class="token punctuation">,</span>\n                <span class="token string">"sns:SetTopicAttributes"</span><span class="token punctuation">,</span>\n                <span class="token string">"sns:DeleteTopic"</span><span class="token punctuation">,</span>\n                <span class="token string">"sns:CreateTopic"</span><span class="token punctuation">,</span>\n                <span class="token string">"sns:Subscribe"</span>\n            <span class="token punctuation">]</span><span class="token punctuation">,</span>\n            <span class="token property">"Resource"</span><span class="token operator">:</span> <span class="token punctuation">[</span>\n                <span class="token string">"arn:aws:lambda:*:&lt;accountId>:function:*"</span><span class="token punctuation">,</span>\n                <span class="token string">"arn:aws:sns:*:&lt;accountId>:*"</span>\n            <span class="token punctuation">]</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">]</span>\n<span class="token punctuation">}</span></code></pre></div>'}}),"\n",s.createElement(n.p,null,s.createElement(n.code,null,"Save and deploy"),"ボタンをクリックすると、アプリの作成が始まります。"),"\n",s.createElement(n.p,null,s.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<span\n      class="gatsby-resp-image-wrapper"\n      style="position: relative; display: block; margin-left: auto; margin-right: auto; max-width: 1280px; "\n    >\n      <a\n    class="gatsby-resp-image-link"\n    href="/static/f2680beb1a55362a9d51f699cab3217f/47f6c/creating-app.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n    <span\n    class="gatsby-resp-image-background-image"\n    style="padding-bottom: 49.6875%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAKCAYAAAC0VX7mAAAACXBIWXMAABYlAAAWJQFJUiTwAAABZUlEQVQoz6WPy27UMBSG8wiwgy0I8Yyw6IbLc/AeCAQVj8ClFW1CgU6ZzIwdJ/Etjv0hu2krdWCBONKn//j46JNdvfrwlXsHb3n88pBHLw55+Pw9D5694/7BG+48ec3dp/9GtZU9n763fGxWfK5/8OXbOc3FlrO1oPmV2VHfoimIfdaCahhGVhcrjo6Oaeqa+vSE7WbD5B3eGiZvCZNb8MzBl/TO7GHNSCWkYp5ncsUUiSVnUgykBMY4hJAI0ZVctxuE7IgxElO6Ju9qY6hkpwghMIeJ7eBoe4/QDkhoPyKGHa1cs9qdI5RAa4PWmpQNeavILntjLZWUizDC2UZx3JzyU9plwSD7jm5Q9HooP7iqK9G+cHlhLj0FWmWYsp1ECDPO+UKcb2R/q0XYYa3FOofzjhCmkpdnj1/IfZn9ieV+1Dp/WdIPA51SdKpfUqH6m/6aPLuFWsj32VOEwziWYR78D9nxG5l05S1I0dTKAAAAAElFTkSuQmCC\'); background-size: cover; display: block;"\n  ></span>\n  <img\n        class="gatsby-resp-image-image"\n        alt="creating-app"\n        title="creating-app"\n        src="/static/f2680beb1a55362a9d51f699cab3217f/21b4d/creating-app.png"\n        srcset="/static/f2680beb1a55362a9d51f699cab3217f/72799/creating-app.png 320w,\n/static/f2680beb1a55362a9d51f699cab3217f/6af66/creating-app.png 640w,\n/static/f2680beb1a55362a9d51f699cab3217f/21b4d/creating-app.png 1280w,\n/static/f2680beb1a55362a9d51f699cab3217f/29114/creating-app.png 1920w,\n/static/f2680beb1a55362a9d51f699cab3217f/47f6c/creating-app.png 2206w"\n        sizes="(max-width: 1280px) 100vw, 1280px"\n        style="width:100%;height:100%;margin:0;vertical-align:middle;position:absolute;top:0;left:0;"\n        loading="lazy"\n        decoding="async"\n      />\n  </a>\n    </span>'}})),"\n",s.createElement(n.p,null,"アプリが無事作成されると、全てのチェックが付いて、",s.createElement(n.code,null,"Continue"),"ボタンがクリックできるようになります。"),"\n",s.createElement(n.p,null,s.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<span\n      class="gatsby-resp-image-wrapper"\n      style="position: relative; display: block; margin-left: auto; margin-right: auto; max-width: 1280px; "\n    >\n      <a\n    class="gatsby-resp-image-link"\n    href="/static/81feebb9caa00731e4b8c5cc974b258c/c658e/your-site-is-being-deployed.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n    <span\n    class="gatsby-resp-image-background-image"\n    style="padding-bottom: 52.1875%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAKCAYAAAC0VX7mAAAACXBIWXMAABYlAAAWJQFJUiTwAAABKElEQVQoz52S7WoCMRBFff9H6Nu0UOif/teCWnU/XNfVzddukm72lMS2CsViHbgkGWYON8xMvHesyorZYsV8sWC+fKfe75FK0UqJkAqRzts0GYaB3a5mvcnIi4I8zzgcD1jn6PuOvlP01tL3/en8Q0prJs45vP8gRhgDfoQQhvRm+4wvX6kbzb6uKYqSXV1zLbquOwGjmwgpjoaikVTSMowgdEXZrqhUSd6uMVanxnEcfymG+QFamxKbRjNdzqlEH/0irKCUOVtZcOyaK7CYCzCGC6BzqdiHgLKBkAoDN8WXu/Rl65h479NEjTFJcRDamNukNdp61PQJ+fiAzGYn4OXY23+siJACoTRtNqN9e0HU+RkYXd6l2NtZpB2Qursf+O3yfBdpsT8BAAsDtxLItg0AAAAASUVORK5CYII=\'); background-size: cover; display: block;"\n  ></span>\n  <img\n        class="gatsby-resp-image-image"\n        alt="your-site-is-being-deployed"\n        title="your-site-is-being-deployed"\n        src="/static/81feebb9caa00731e4b8c5cc974b258c/21b4d/your-site-is-being-deployed.png"\n        srcset="/static/81feebb9caa00731e4b8c5cc974b258c/72799/your-site-is-being-deployed.png 320w,\n/static/81feebb9caa00731e4b8c5cc974b258c/6af66/your-site-is-being-deployed.png 640w,\n/static/81feebb9caa00731e4b8c5cc974b258c/21b4d/your-site-is-being-deployed.png 1280w,\n/static/81feebb9caa00731e4b8c5cc974b258c/29114/your-site-is-being-deployed.png 1920w,\n/static/81feebb9caa00731e4b8c5cc974b258c/c658e/your-site-is-being-deployed.png 2202w"\n        sizes="(max-width: 1280px) 100vw, 1280px"\n        style="width:100%;height:100%;margin:0;vertical-align:middle;position:absolute;top:0;left:0;"\n        loading="lazy"\n        decoding="async"\n      />\n  </a>\n    </span>'}})),"\n",s.createElement(n.p,null,s.createElement(n.code,null,"Continue"),"ボタンをクリックするとAmplify Consoleを利用してアプリのデプロイが開始されます。"),"\n",s.createElement(n.p,null,s.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<span\n      class="gatsby-resp-image-wrapper"\n      style="position: relative; display: block; margin-left: auto; margin-right: auto; max-width: 1280px; "\n    >\n      <a\n    class="gatsby-resp-image-link"\n    href="/static/210ae7f971236e563ab840df781024f7/03692/deploy.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n    <span\n    class="gatsby-resp-image-background-image"\n    style="padding-bottom: 69.0625%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAOCAYAAAAvxDzwAAAACXBIWXMAABYlAAAWJQFJUiTwAAACJElEQVQ4y51T227UQAzd//8R3njjI3hAou2uKLSlpdnc535NZrM5yM4WUfpSMdKRL7Edz/F450NA1Qs0XY9j3WAUAuRz3r8L1jkoYyGVZn0XU8Lh2y2ubva43h9w+/0HRikxCIFRSNaNtRz8L4x1yDFgjg5GSbZ3eZpYGaXaMAr0/YCuH1A3LZTSmOcZ0zRhInkB5Z1KwVWl8Gnf4rpSiCFgl3OGswbOKFijYIyB0pqhjeFrxRQR41uklFBLi9tGsQzBY5fyhLau0Dzdoa2e0Awj6n5A04+Q1kE7z1K9gmdJfqbDXhqwlgpmHLqA68cWh59H7B+eUQmLWkc0F9Q6oFb+gk1vdGCIWNDaCZ0/QcaZhpLRKI/HZsDDscN91eKeZKdRSYdWeww2obeR8aIPBJchjIN42kM8fIXsj1uH3TBCSAWpFI+fOVQKQkj2U8wbpIQ0FUTVIXz5iPD5A9yvm23Kwga4EBFCQJgK/veksmxTpokZa+C9A1FADzukhHVdcT6fObgsBalEpFKQy4JSCk6nE39bzwtwXpBS3Dr0MSJPmT4B68rBIcZXf9dJ4lnfoXUerc3QWiHEtBVc163DnC8FQ4DxAS4muJCgfeCC9KCtdZjnwknzNDOoa7JDiFiWhXUC8cpD4cQ0QfiEwSWWp2Xh7TDGgmih042S932QCrmcmfMXSv50mC4cUvJMmDdJ/sz2tmZkK7cNj/afOKYV/HvydNPfG4gxbZ8brvEAAAAASUVORK5CYII=\'); background-size: cover; display: block;"\n  ></span>\n  <img\n        class="gatsby-resp-image-image"\n        alt="deploy"\n        title="deploy"\n        src="/static/210ae7f971236e563ab840df781024f7/21b4d/deploy.png"\n        srcset="/static/210ae7f971236e563ab840df781024f7/72799/deploy.png 320w,\n/static/210ae7f971236e563ab840df781024f7/6af66/deploy.png 640w,\n/static/210ae7f971236e563ab840df781024f7/21b4d/deploy.png 1280w,\n/static/210ae7f971236e563ab840df781024f7/29114/deploy.png 1920w,\n/static/210ae7f971236e563ab840df781024f7/03692/deploy.png 2440w"\n        sizes="(max-width: 1280px) 100vw, 1280px"\n        style="width:100%;height:100%;margin:0;vertical-align:middle;position:absolute;top:0;left:0;"\n        loading="lazy"\n        decoding="async"\n      />\n  </a>\n    </span>'}})),"\n",s.createElement(n.p,null,"エラーなどが発生しなければデプロイ完了です。"),"\n",s.createElement(n.h3,{id:"amplify-slack-botの場合の追加設定"},s.createElement(n.code,null,"amplify-slack-bot"),"の場合の追加設定"),"\n",s.createElement(n.p,null,"デプロイするアプリによっては、ここまでのデプロイまでの手順に追加で設定が必要になります。",s.createElement(n.code,null,"amplify-slack-bot"),"もいくつか設定が必要です。\nまず、自分のGitHubアカウントに",s.createElement(n.code,null,"amplify-slack-bot"),"をforkしたリポジトリが作成されているはずなので、そのリポジトリをcloneします。\ncloneできたら",s.createElement(n.code,null,"amplify pull"),"でデプロイしたアプリをpullしておきます。"),"\n",s.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">git clone &lt;url of your amplify-slack-bot repository>\ncd amplify-slack-bot\namplify pull</code></pre></div>'}}),"\n",s.createElement(n.h4,{id:"slackアプリのシークレットの設定"},"Slackアプリのシークレットの設定"),"\n",s.createElement(n.p,null,s.createElement(n.code,null,"amplify-slack-bot"),"はSlackアプリとして動作するため、Slack側での操作も必要です。",s.createElement(n.a,{href:"https://github.com/fossamagna/amplify-category-console-notification/blob/main/packages/amplify-slack-app/docs/SETUP.md"},"こちらの手順でSlackアプリのセットアップ"),"を行ってください。\nその後、以下の3つのシークレットをAWSのパラメーターストアに設定します。"),"\n",s.createElement(n.ul,null,"\n",s.createElement(n.li,null,"SLACK_SIGNING_SECRET"),"\n",s.createElement(n.li,null,"SLACK_BOT_TOKEN"),"\n",s.createElement(n.li,null,"SLACK_DEFAULT_CHANNEL"),"\n"),"\n",s.createElement(n.p,null,"値の設定はamplifyコマンドを使います。",s.createElement(n.code,null,"amplify function update"),"で以下のようにシークレットの値を設定します。"),"\n",s.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="console"><pre class="language-console"><code class="language-console">% amplify function update\n? Select the Lambda function you want to update slackApp\nGeneral information\n- Name: slackApp\n- Runtime: nodejs\n\nResource access permission\n- Not configured\n\nScheduled recurring invocation\n- Not configured\n\nLambda layers\n- Not configured\n\nEnvironment variables:\n- Not configured\n\nSecrets configuration\n- SLACK_SIGNING_SECRET\n- SLACK_BOT_TOKEN\n- SLACK_DEFAULT_CHANNEL\n\n? Which setting do you want to update? Secret values configuration\n? What do you want to do? Update a secret\n? Select the secret to update: SLACK_SIGNING_SECRET\n? Enter the value for SLACK_SIGNING_SECRET: [hidden]\n? What do you want to do? Update a secret\n? Select the secret to update: SLACK_BOT_TOKEN\n? Enter the value for SLACK_BOT_TOKEN: [hidden]\n? What do you want to do? Update a secret\n? Select the secret to update: SLACK_DEFAULT_CHANNEL\n? Enter the value for SLACK_DEFAULT_CHANNEL: [hidden]\n? What do you want to do? I&#39;m done</code></pre></div>'}}),"\n",s.createElement(n.h4,{id:"amplifybackendfunctionslackappparametersjsonの編集"},s.createElement(n.code,null,"amplify/backend/function/slackApp/parameters.json"),"の編集"),"\n",s.createElement(n.p,null,"次に、上記で設定した3つのシークレットをSlackアプリのLambda関数から読み取るために必要な値を設定します。\n",s.createElement(n.code,null,"amplify/backend/function/slackApp/parameters.json"),"の",s.createElement(n.code,null,"secretsPathAmplifyAppId"),"にデプロイしたアプリのIDを設定します。"),"\n",s.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="json"><pre class="language-json"><code class="language-json"><span class="token punctuation">{</span>\n  <span class="token property">"secretsPathAmplifyAppId"</span><span class="token operator">:</span> <span class="token string">"&lt;appId>"</span>\n<span class="token punctuation">}</span></code></pre></div>'}}),"\n",s.createElement(n.p,null,"以下のコマンドを実行するとアプリのIDが取得できるので、",s.createElement(n.code,null,"<appId>"),"の部分をその値で置き換えてください。ファイルを書き換えたらgitでcommit & pushします。"),"\n",s.createElement(n.div,{dangerouslySetInnerHTML:{__html:'<div class="gatsby-highlight" data-language="text"><pre class="language-text"><code class="language-text">amplify env get --name dev | grep AmplifyAppId</code></pre></div>'}}),"\n",s.createElement(n.p,null,"git pushするとAmplify Consoleでビルドが自動で開始され、設定したSlackチャネルでAmplify Consoleのビルド通知が受け取れるようになります。"),"\n",s.createElement(n.h2,{id:"やってみた感想"},"やってみた感想"),"\n",s.createElement(n.p,null,"実際にボタンを設定して、アプリを追加するまでをやってみて、ボタンを利用する側とそれを設定する側のPros & Consを考えてみました。"),"\n",s.createElement(n.h3,{id:"ボタンを利用者する側"},"ボタンを利用者する側"),"\n",s.createElement(n.ul,null,"\n",s.createElement(n.li,null,"Pros:","\n",s.createElement(n.ul,null,"\n",s.createElement(n.li,null,s.createElement(n.code,null,"Deploy to Amplify Console"),"ボタンをクリックしてからブラウザのみでウィザード形式でアプリのデプロイまでできる。（ブラウザのみで完結できるかはアプリ次第ではある）"),"\n"),"\n"),"\n",s.createElement(n.li,null,"Cons:","\n",s.createElement(n.ul,null,"\n",s.createElement(n.li,null,"アプリが利用するサービスによっては、ウィザード形式とは別の手順が必要になってしまう。"),"\n",s.createElement(n.li,null,"デプロイに失敗した場合、原因特定が大変そう。"),"\n",s.createElement(n.li,null,"publicリポジトリとして一般に公開する場合、GitHubのforkを利用しているため、forkしたリポジトリのvisiblityを変更できない。少なくともpublicをprivateにはできない。forkした後に追加、編集したいいファイルがあって内容的にpublicでは困るというパターンはありそう。"),"\n"),"\n"),"\n"),"\n",s.createElement(n.h3,{id:"ボタンを設置する側"},"ボタンを設置する側"),"\n",s.createElement(n.ul,null,"\n",s.createElement(n.li,null,"Pros:","\n",s.createElement(n.ul,null,"\n",s.createElement(n.li,null,"作ったAmplifyアプリを共有しやすい（使ってもらいやすい）"),"\n"),"\n"),"\n",s.createElement(n.li,null,"Cons:","\n",s.createElement(n.ul,null,"\n",s.createElement(n.li,null,"ウィザード形式とは別の手順は完全独自に用意しないといけない。"),"\n"),"\n"),"\n"),"\n",s.createElement(n.p,null,"アプリによって追加で設定が必要な値がブラウザ内で完結できるような仕組みがあると、アプリの公開側も利用者側もうれしいんではないかと思います。シークレット値(パラメーターストアの値)を設定するために、forkしたリポジトリをcloneしてamplifyコマンドを実行しないといけないのはユーザー体験としてはよくないなと感じました。\nJSONやYAMLで追加設定項目を定義したファイルをリポジトリに含めればアプリ追加時に設定項目をカスタマイズできたりするといいなと思います。\n今回やってみて考えたことなどは ",s.createElement(n.a,{href:"https://github.com/aws-amplify/amplify-hosting"},"https://github.com/aws-amplify/amplify-hosting")," の Issue でAmplifyの開発チームなどにフィードバックしていこうと思います。"),"\n",s.createElement(n.p,null,"最後に、AmplifyとSlackを使っている方がいらっしゃれば、今回用意した",s.createElement(n.code,null,"amplify-slack-bot"),"を使ってみてもらえると嬉しいです。そしてフィードバックなどいただけると非常にありがたいです。よろしくお願いします。"))}var c=function(e){void 0===e&&(e={});var n=Object.assign({},(0,l.ah)(),e.components).wrapper;return n?s.createElement(n,e,s.createElement(i,e)):i(e)},o=a(1597),p=a(8771),r=a(5297),m=a(746),d=["data"],g=function(e){var n=e.data,a=(0,t.Z)(e,d),l=n.mdx;return s.createElement(m.F,Object.assign({data:n,title:l.frontmatter.title,description:l.frontmatter.description||l.excerpt},a))},u=function(e){var n,a=e.data,t=e.location,l=e.children,i=a.mdx,c=(null===(n=a.site.siteMetadata)||void 0===n?void 0:n.title)||"Title",m=a.previous,d=a.next;return s.createElement(r.Z,{location:t,title:c},s.createElement("article",{className:"blog-post",itemScope:!0,itemType:"http://schema.org/Article"},s.createElement("header",null,s.createElement("h1",{itemProp:"headline"},i.frontmatter.title),s.createElement("p",null,i.frontmatter.date)),l,s.createElement("hr"),s.createElement("footer",null,s.createElement(p.Z))),s.createElement("nav",{className:"blog-post-nav"},s.createElement("ul",{style:{display:"flex",flexWrap:"wrap",justifyContent:"space-between",listStyle:"none",padding:0}},s.createElement("li",null,m&&s.createElement(o.Link,{to:m.fields.slug,rel:"prev"}," ← ",m.frontmatter.title)),s.createElement("li",null,d&&s.createElement(o.Link,{to:d.fields.slug,rel:"next"},d.frontmatter.title," →")))))};function f(e){return s.createElement(u,e,s.createElement(c,e))}},3366:function(e,n,a){function t(e,n){if(null==e)return{};var a,t,l={},s=Object.keys(e);for(t=0;t<s.length;t++)a=s[t],n.indexOf(a)>=0||(l[a]=e[a]);return l}a.d(n,{Z:function(){return t}})}}]);
//# sourceMappingURL=component---src-templates-blog-post-js-content-file-path-home-runner-work-fossamagna-github-io-fossamagna-github-io-content-blog-deploy-to-amplify-console-index-mdx-339007b42a2396bfdffb.js.map