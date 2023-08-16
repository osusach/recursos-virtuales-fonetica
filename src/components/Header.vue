<template>
    <header className="bg-usach-aqua-900 flex items-center p-4">
        
        <button className="flex-none">
            <router-link to="/">
                <img src="/Usach SB.png" alt="Logo Usach" className="logo-sb hidden lg:block"/>
                <img src="/Usach PB.png" alt="Logo Usach" className="logo-pb lg:hidden block"/>
            </router-link>
        </button>
        <div class="flex-grow text-center">
            <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-usach-bebas-title text-white ">Recursos Virtuales para el aprendizaje del Lenguaje</h1>
        </div>
    </header>
</template>

<style>
.logo-pb{
    height: 170px;
    width: 170px;
}
.logo-sb{
    height: 170px;
    width: 538px;
}
</style>