# XVBA-CLI

## Command Line Interface for XVBA VSCode extension (Under Construction)

- This package provides a way to add VBA packages in Excel with XVBA VSCode extension

## List of Commands

### Add Package

- For add new packages use the command (xvba_gaus package example)

```
npx xvba add https://github.com/Aeraphe/xvba_gaus.git
```

### List Package

- For add new packages use the command

```
npx xvba ls
```

### Delete Package (2 ways)

- For add new packages use the command (xvba_gaus package example)

```
npx xvba del :item (Replace :item for the package item number)
```

or

```
npx xvba del --n :packageName (Replace :packageName for the package name)
```
