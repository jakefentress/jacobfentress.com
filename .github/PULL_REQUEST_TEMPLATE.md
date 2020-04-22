**Summary**

A brief description describing the problem or feature this PR resolves. Include designs/comps below this sections using `![](<image_url>)` or `<img>`. The more content we can provide to the reviewer within the PR description the better. Highlight specific areas from the design when appropriate; for instance, if the PR's concern was the navigation, your image could look like so:

![](https://chompy.tv/-/fictivekin_com-_1E79A824.png)

---

**Reviewer Notes**

-   Any line(s) of code or files you wish to bring the reviewers attention to?
-   Do `pip` packages or other dependencies need to be installed prior to reviewing this PR?
-   Although it is usually clear from the PR branch, be explicit about the branch the reviewer should look at
-   Is this PR blocked by an API issue/PR? If so, let the reviewer know to prevent merging incomplete features into `master`

---

**Testing**

-   [ ] supported browsers
    -   [ ] Chrome
    -   [ ] Firefox
    -   [ ] Safari
    -   [ ] Edge
    -   [ ] iOS Safari
        -   [ ] iOS Safari landscape
        -   [ ] iOS iPad
        -   [ ] iOS iPad landscape
    -   [ ] Android Chrome
        -   [ ] Android Chrome landscape
-   [ ] CMS checklist
    -   [ ] Add conditionals around elements that could be blank, nil, or deleted and make sure it does not break the layout
    -   [ ] For every body of text where a client might want to bold, italic, or more, add `markdown` filters
    -   [ ] When creating data structures in the CMS, will the module need to be repeated? If so, make it a list so it's easily repeated.

---

**Issue Action**

[Closes|References] fictivekin/[repo]#[issue_number]

For example:

Closes fictivekin/frontend-handbook#1
