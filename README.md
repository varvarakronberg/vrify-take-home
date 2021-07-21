# Vrify Web Coding Assignment

## Background

There is a data.json included that has a list of companies that we'd like to
display on a page. The page will include two filters and pagination. The
assignment shouldn't take more than 3-4 hours.

- Use any modern reactive webapp framework (ex/ React, Vue, Angular, etc.)

## Requirements

### Results

- Should show company image
  - Images should all have the same dimensions
  - In the data provided, the images are of different dimensions. The images
    should all have the same dimensions and the images should be **cropped** to
    fit the column (**not stretched**)
- Should have company name underneath image

### Filters

- One filter for regions: Africa, Oceania, Europe, North America, South
  America, Central America, Asia

  - Multiple filters are allowed to be selected and each one is an **OR**
    filter. Example:
    - "Africa" selected - only companies that are in "Africa"
    - "Africa, Oceania" selected - both companies that are in "Africa" and
      "Oceania"

- Range filter for Market Cap: Data is in "millions". Range options should be $0M,
  $20M, $40M, $60M, $80M, $100M, $100M+ and it'd be a slider for min and max
  values. Example:
  - Min: "$0M", Max: "$100M+" - All companies
  - Min: "$60M", Max: "80M" - Companies with a market cap between 60 and 80
    (range values inclusive)

### Pagination

- Each page should have 8 results and additional pages should be on the bottom
  of the page

### Responsive

- Should go from one column of results to three columns based off of screen
  size.

- Filters can be placed anywhere on mobile view

### Tests

- Include any tests you find necessary

### Examples

**Note: the assignment doesn't have to match these screenshots, they're just
examples so you can get an idea of what the end result "could" look like**

One column:
![](./example-images/one-column.png)
Two column:
![](./example-images/two-column.png)
Three column:
![](./example-images/three-column.png)

## Submitting a solution

1. Download this repo
2. Complete the problem outlined in the `Requirements` section
3. In your personal public GitHub repo, create a new public repo with this implementation
4. Provide this link to your contact

## Help

If you have any questions regarding requirements, do not hesitate to email your contact for clarification.

## Installation and running this solution

TODO: Please fill
