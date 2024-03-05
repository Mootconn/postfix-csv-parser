# Summary
I have used 'for' loops to iterate over the rows and columns as I think this looks
the cleanest and is easy to understand when you can reference 'row' and 'column'
directly rather than 'i' and 'j'. The current version of this parser takes the
string 'csvString' and parses over it using '\n' for row seperators and ',' for columns.
I have also provided some test data that is commented out at the top of spreadsheet.ts for
testing purposes. I wasn't sure how to get import and parse the csv without importing some
third party libraries which is why I have implemented it like this.

## Further improvements
I would like to get evaluateCell working recursively, at the moment it only goes one
reference level deep so that would be nice to get working in the future. There are a few
edge cases which currently aren't handled which I have included in spreadsheet.ts.
