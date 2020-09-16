# XVBA-CLI

## Command Line Interface for XVBA VSCode extension (Under Construction)

- This package provides a way to add VBA packages in Excel with XVBA VSCode extension
- Add third packages to your project with command line interface


## Install


- Type on terminal and press enter for install the xvba-cli  Last Version

```
 npm i @localsmart/xvba-cli@latest --save-dev
```

 <p>
 <img src="https://github.com/aeraphe/images-xvb/raw/master/images/npm_install.gif" alt="Install Packages">
</p>


## List of Commands

### Add Package

- For add new packages use the command (xvba_gaus package example)

```
npx xvba add https://github.com/Aeraphe/xvba_gaus.git
```

   <p>
 <img src="https://github.com/aeraphe/images-xvb/raw/master/images/xvba_add.gif" alt="Add Packages">
</p>

### List Package

- For list packages use the command

```
npx xvba ls
```
<p>
 <img src="https://github.com/aeraphe/images-xvb/raw/master/images/xvba_ls.gif" alt="List Packages">
</p>

### Delete Package (2 ways)

- For delete packages use the command 

```
npx xvba del :item (Replace :item for the package item number)
```

or

```
npx xvba del --n :packageName (Replace :packageName for the package name)
```

   <p>
 <img src="https://github.com/aeraphe/images-xvb/raw/master/images/xvba_del.gif" alt="Delete Packages">
</p>


### Create Your Own Package and publish on Xvba Repository

<p> For Build use the command: (replace the [package] for your package name/folder ) </p>

```
npx xvba create [package]

```

This command will create a folder and files on xvba_modules with [package] name


### Build Your Own Package and publish on Xvba Repository

<p> For Build use the command: (replace the [package] for your package name/folder ) </p>

```
npx xvba build [package]

```
