# Yunseo Cho GitHub Blog

Jekyll 기반 GitHub Pages 블로그입니다.

## Local Preview

Ruby 3 환경에서는 아래 명령을 사용합니다.

```bash
bundle exec jekyll serve
```

현재 PC처럼 Ruby 4 환경에서 GitHub Pages/Jekyll 3 스택을 미리 볼 때는 호환 wrapper를 사용합니다.

```bash
ruby bin/jekyll-ruby4.rb serve --host 127.0.0.1 --port 4000 --livereload
```

## Content

- 블로그 글은 `_posts/`에 추가합니다.
- 블로그 섹션은 글의 `categories` front matter로 자동 생성됩니다.
- 뉴스와 활동 기록은 `_news/`에 추가하며, 블로그 인기/최신 목록에는 섞이지 않습니다.
- CV PDF를 쓰려면 파일을 `assets/files/` 등에 넣고 `_config.yml`의 `cv_pdf`에 경로를 적습니다.
