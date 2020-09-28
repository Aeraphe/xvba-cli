# XVBA-CLI

## Command Line Interface for XVBA VSCode extension (Under Construction)

- This package provides a way to instal VBA packages in Excel with XVBA VSCode extension
- For mo details see: <a href="https://www.xvba.dev">www.xvba.dev</a>

- Install packages to your project with command line interface
- <b>Create/Build</b> a a VBA package and publish on XVBA repository


## Install

- Type on terminal and press enter for install the xvba-cli Last Version

```
 npm i @localsmart/xvba-cli@latest --save-dev
```

 <p>
 <img src="https://github.com/aeraphe/images-xvb/raw/master/images/npm_install.gif" alt="Install Packages">
</p>

## List of Commands

### Install Package

- For install new packages use the command 

```
npx xvba install [package]
```


### List Package

- For list packages use the command

```
npx xvba ls
```

<p>
 <img src="https://github.com/aeraphe/images-xvb/raw/master/images/xvba_ls.gif" alt="List Packages">
</p>

### Uninstall Package 

- For uninstall packages use the command

```
npx xvba uninstall [package]
```



### Create a XVBA package

<p> For Create use the command: (replace the [package] for your package name/folder ) </p>

This command will create a folder and files (on xvba_modules) for you start to create your own package


```
npx xvba create [package]

```

### Build Your Own Package and publish on Xvba Repository

<p> For Build use the command: (replace the [package] for your package name/folder ) </p>

```
npx xvba build [package]

```

### Add VBA files to Your Project

<p> For Build use the command: (replace the [filename] for your package name/filename ) </p>

```
npx xvba add -c [filename] //For classes

npx xvba add -m [filename] //For Modules

```
