/* All following exams please using Javascript only 20220922 */

## 1. sort Data

```javascript
/**
 There is an array, each item has such format:
 {firstName: 'xxx', lastName: 'xxx', customerID: 'xxx', note: 'xxx', profession: ‘xxx’}
 lastName, note can be empty, customerID can only be a set of digital numbers.
 profession can only have ‘student’, ‘freelancer’, ‘productOwner’, ‘engineer’ or
 ‘systemAnalytics’.
 **/
/**
 Q1. Please follow the principle (‘firstName’ + ‘lastName’ + ‘customerID’) to sort this
 array and print it out.
 **/
function sortUserName(user) {

    const arr = users
        .map(user => ({
            ...user,
            userName: `${user.firstName || ''} ${user.lastName || ''} ${user.customerID || ''}`
        }))
        .sort((a, b) => a.userName.localeCompare(b.userName));

    console.log(arr);
}

/**
 Q2. Please sort by ‘profession’ to follow the principle.
 (‘systemAnalytics’ > ‘engineer’ > ‘productOwner’ > ‘freelancer’ > ‘student’’)
 **/
function sortByType(user) {

    const professionLevel = {
        student: 1,
        freelancer: 2,
        productOwner: 3,
        engineer: 4,
        systemAnalytics: 5,
    }

    // -1 : a 比 b 小 ( a 向前移動 )
    //  0 : 相同
    //  1 : a 比 b 大 ( a 向後移動 )
    const arr = users.sort((a, b) => professionLevel[a.profession] - professionLevel[b.profession]);

    // 將分數較大的往後放~~
    console.log(arr);
}
```

---

## 2. css quiz

```vue
<template>
  <div class="container">
    <div class="header">5/8 外出確認表</div>
    <div class="content">
      <ol class="shop-list">
        <li class="item">麵包</li>
        <li class="item">短袖衣服</li>
        <li class="item">飲用水</li>
        <li class="item">帳篷</li>
      </ol>
      <ul class="shop-list">
        <li class="item">暈車藥</li>
        <li class="item">感冒藥</li>
        <li class="item">丹木斯</li>
        <li class="item">咳嗽糖漿</li>
      </ul>
    </div>
    <div class="footer">以上僅共參考</div>
  </div>
</template>

<style>
  .container {
    font-size: 14px;
  }
  .container .header {
    font-size: 18px;
  }
  .container .shop-list {
    list-style: none;
    margin-left: -15px;
  }
  .container .shop-list li.item {
    color: green;
  }
  .container .shop-list .item {
    color: blue;
  }
</style>
```

### 考題 & 答案

1. 解釋為何 `.container .shop-list .item` 區塊設定的文字顏色沒有生效 ? 請將其修正讓 first row 套用之 

因為 `.container .shop-list li.item` 多一層 li 因此權重比 `.container .shop-list .item` 大

i.  將 `.container .shop-list .item` 調整成 `.container .shop-list .item:nth-child(1)` 只讓 first row 變成藍色字
ii. 將 `.container .shop-list li.item` 調整成 `.container .shop-list .item` 就可讓藍字設定生效

```css
 .container .shop-list .item {
    color: green;
}

.container .shop-list .item:nth-child(1) {
    color: blue;
}
```

2. 條紋效果（striped effect）- "Write styling make every other line give background color to next one"

```css
.container .shop-list .item:nth-child(odd) {
    color: blue;
}
```

---

## 3. Unique the Data

```javascript
/**
 let items = [1, 1, 1, 5, 2, 3, 4, 3, 3, 3, 3, 3, 3, 7, 8, 5, 4, 9, 0, 1, 3, 2, 6, 7, 5,
 4, 4, 7, 8, 8, 0, 1, 2, 3, 1];
 Please write down a function to console log unique value from this array.
 **/
function getUniqueNumber(items) {
    const set = new Set(items);
    const uniqueArr = [...set];
    console.log(uniqueArr.join(','));
}
```

## 4. HTML Tag

> What is different between <section> and <article>, can you make an example how you
will be using it?

### answer

```
The <section> and <article> tags in HTML have distinct purposes and are used to structure content semantically:

Key Differences
<section>:

Represents a thematic grouping of content, typically with a heading.
Used for grouping related content within a document.
Often serves as a container for multiple <article> elements or other grouped elements.
Examples: a chapter of a book, a tab in a multi-tab interface, or a section in a report.
<article>:

Represents a self-contained, reusable piece of content that could stand alone outside the document.
Typically used for blog posts, news articles, or forum posts.
Content within <article> should make sense on its own and be shareable independently.
```

## 5. css boxing model

> Please explain about what is CSS boxing model and the layout components that it
consists of.

### answer

```
+-------------------------------+
|          Margin              |
|   +-----------------------+  |
|   |      Border           |  |
|   |  +-----------------+  |  |
|   |  |    Padding      |  |  |
|   |  | +-------------+ |  |  |
|   |  | |   Content   | |  |  |
|   |  | +-------------+ |  |  |
|   |  +-----------------+  |  |
|   +-----------------------+  |
+-------------------------------+
```

#### box-sizing: content-box; (預設值)

The width and height properties set the dimensions of the content only.
Total size = width + padding + border + margin.

#### box-sizing: border-box;

The width and height include padding and border.
Total size = specified width + margin.

---

## 6. css priority

> Can you explain CSS priority, and what principle are your used to writing CSS
stylesheet.

#### explain CSS priority

利用下述分數進行加總 , 將分數較高者 , 套用那個樣式

- Inline styles: 1000
- IDs (#id): 100
- Classes (.class), attributes ([attr]), and pseudo-classes (:hover): 10
- Elements (div, h1, etc.) and pseudo-elements (::before): 1

> !important 有最高的優先級 , 覆蓋沒有 !important 的定義 , 如果有兩個 !important 那還是會比較權重分數 , 不過要避免使用 !important {{{(>_<)}}}

#### principle writing css

最近使用 TailwindCSS 盡量用 utility-first CSS 方式定義

## 7. Semantic HTML

> Can you introducing some of Semantic HTML elements that you already know and how you
used it ever, please make some example.


## 8. SEO Html

> The photo below is a page structural layer, please according to SEO friendly rules
write down HTML base structure. Note. Mobile friendly first. 

![quiz-8-pic](./quiz-8-pic.png)

```html

<body>
<!- HTML structure start -->
</body>
```
