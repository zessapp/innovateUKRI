import matplotlib.pyplot as plt
from matplotlib.pyplot import figure
import pandas as pd
import numpy as np

def generate_plots(df, n1, n2, n3, n4):

    fig, axes = plt.subplots(nrows=2, ncols=2, figsize=(15, 15))

    ax1 = df.plot(ax=axes[0, 0], y='Salt', use_index=False,
    title='{} in (g) for Ranked Menu Items.'.format('Salt'))
    ax2 = df.plot(ax=axes[0, 1], y='Sodium', use_index=False,
    title='{} in (mg) for Ranked Menu Items.'.format('Sodium'))
    ax3 = df.plot(ax=axes[1, 0], y='sugar', use_index=False,
    title='{} in (g) for Ranked Menu Items.'.format('Sugar'))
    ax4 = df.plot(ax=axes[1, 1], y='Fibre', use_index=False,
    title='{} in (mg) for Ranked Menu Items.'.format('Fibre'))

    ax1.set_xlabel("Rank Index")
    ax1.set_ylabel("{} (g)".format('Salt'))
    ax1.grid('on')
    ax2.set_xlabel("Rank Index")
    ax2.set_ylabel("{} (mg)".format('Sodium'))
    ax2.grid('on')
    ax3.set_xlabel("Rank Index")
    ax3.set_ylabel("{} (g)".format('Sugar'))
    ax3.grid('on')
    ax4.set_xlabel("Rank Index")
    ax4.set_ylabel("{} (g)".format('Fibre'))
    ax4.grid('on')
